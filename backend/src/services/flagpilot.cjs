// Server-only FlagPilot integration. Never import this file in frontend code.
let client;
let initialization;
let closed = false;

async function initializeFlags() {
  if (closed) return;

  if (!initialization) {
    initialization = (async () => {
      if (!process.env.FLAGPILOT_URL || !process.env.FLAGPILOT_SERVER_KEY) {
        return;
      }

      try {
        const { FlagPilot } = await import('@flagpilot/node');
        const initialized = await FlagPilot.initialize({
          baseUrl: process.env.FLAGPILOT_URL,
          apiKey: process.env.FLAGPILOT_SERVER_KEY,
          requestTimeoutMs: 3000
        });

        if (closed) {
          initialized.close();
        } else {
          client = initialized;
        }
      } catch (error) {
        console.warn('FlagPilot unavailable; OTC uses its configured fallback.');
      }
    })();
  }

  return initialization;
}

function otcAvailable(req, res, next) {
  const context = req.userId ? { userId: String(req.userId) } : {};

  // Preserve existing OTC availability when FlagPilot is unconfigured or cold-start unavailable.
  const enabled = client
    ? client.isEnabled('otc-consultations', context, true)
    : true;

  if (!enabled) {
    return res.status(503).json({
      success: false,
      error: {
        code: 'FEATURE_UNAVAILABLE',
        message: 'OTC consultations are temporarily unavailable. Please try again later.'
      }
    });
  }

  return next();
}

function closeFlags() {
  closed = true;
  client?.close();
}

module.exports = { initializeFlags, otcAvailable, closeFlags };
