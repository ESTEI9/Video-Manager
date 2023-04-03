import { HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";

export const SessionError = (req: HttpRequest<any>) => {
    return new HttpResponse({
        body: 'Invalid Session',
        status: HttpStatusCode.Unauthorized,
        url: req.url
    })
}