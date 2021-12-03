import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (response.headersSent) { return; }

    let status = 500;
    if (exception.getStatus) {
      status = exception.getStatus();
    } else if (exception.status) {
      status = exception.status;
    }

    console.log(JSON.stringify(exception, undefined, 2));

    const message = exception.message || 'Something broken!';

    if (status < 500) {
      response.locals.message = message;
    }

    if (!status || status === 500) {
      console.error(exception);
    }

    return response.status(status || 500).json({
      message: response.locals.message,
    });
  }
}
