export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(
    level: string,
    message: string,
    meta?: Record<string, any>,
  ) {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` | ${JSON.stringify(meta)}` : '';
    return `[${level}] [${this.context}] [${timestamp}] ${message}${metaString}`;
  }

  info(message: string, meta?: Record<string, any>) {
    console.log(this.formatMessage('INFO', message, meta));
  }

  warn(message: string, meta?: Record<string, any>) {
    console.warn(this.formatMessage('WARN', message, meta));
  }

  error(message: string, meta?: Record<string, any>) {
    console.error(this.formatMessage('ERROR', message, meta));
  }

  debug(message: string, meta?: Record<string, any>) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('DEBUG', message, meta));
    }
  }
}