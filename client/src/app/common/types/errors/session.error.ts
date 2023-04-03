import { HttpErrorResponse, HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";

export const SessionError = (req: HttpRequest<any>) => {
    return new HttpResponse<HttpErrorResponse>({
        ...req,
        body: {...req.body, message: 'Invalid Session'},
        status: HttpStatusCode.Unauthorized,
        url: req.url,
        
    })
}