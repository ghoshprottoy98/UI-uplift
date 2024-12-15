import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon, SweetAlertOptions, SweetAlertPosition, SweetAlertResult} from 'sweetalert2';
import {Queue, isNotEmpty} from '@bracit/common-utils';

type Awaited<T> = T extends Promise<infer U> ? U : T;

const queue = new Queue<any>();
function SwalProxy(options: SweetAlertOptions, force?: boolean): Promise<SweetAlertResult<Awaited<any>>> {

        if (Swal.isVisible() && !force) {
            return new Promise<SweetAlertResult<Awaited<any>>>((a) => {
                queue.enqueue({resolve: a, options});
            });
        }

        const promise = Swal.fire(options);

        function processQueue() {
            if (!queue.isEmpty()) {
                const o = queue.dequeue();
                SwalProxy(o.options, true).then(v => {
                    o.resolve(v);
                });
            }
        }

        promise.then(() => {
            setTimeout(() => processQueue(), 300);
        });

        return promise;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  notify(iconType?: SweetAlertIcon, text?: string, options?:SweetAlertOptions) {
    const defaultOptions = {
      icon: iconType,
      position: 'top-end',
      titleText: text,
      showConfirmButton: false
    };

    const extra = options?.toast ? {} : {allowOutsideClick: false, backdrop: false};

    return SwalProxy(Object.assign({}, defaultOptions, extra, options));
  }

  centerDialog(icon?: SweetAlertIcon, title?: string, text?: string, imageUrl?: string) {
    return this.notify(icon, title, {
      buttonsStyling: false,
      text: text || undefined,
      imageUrl: imageUrl || undefined,
      backdrop: true,
      position: 'center',
      showConfirmButton: true,
      customClass: {
        title: 'swal2-title text-danger',
        confirmButton: 'px-12 btn btn-primary btn-shadow font-weight-bold'
      }
    });
  }

  imageAlert(imageUrl?:string, title?:string, text?:string) {
    return this.centerDialog(undefined, title, text, imageUrl);
  }

  alert(title: string, text= ''){
    return this.centerDialog('info', title, text);
  }

  error(title:string, text?:string){
    return this.centerDialog('error', title, text);
  }

  success(text:string, timeout?: number){
    return this.notify('success', text, {
      timer: timeout || 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  warning(text:string, timeout?:number){
    return this.notify('warning', text, {
      timer: timeout || 3000
    });
  }

  info(text:string, timeout?:number) {
    return this.notify('info', text, {
      timer: timeout || 3000
    });
  }

  toast(iconType: SweetAlertIcon, text: string, position?: SweetAlertPosition, timeout?: number) {
    return SwalProxy({
      icon: iconType,
      position: position || 'top-end',
      title: text,
      timer: timeout || 3000,
      toast: true,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  }

  errorToast(text:string, position?: SweetAlertPosition, timeout?: number) {
    return this.toast('error', text, position, timeout);
  }

  successToast(text:string, position?: SweetAlertPosition, timeout?: number) {
    return this.toast('success', text, position, timeout);
  }

  infoToast(text:string, position?: SweetAlertPosition, timeout?: number) {
    return this.toast('info', text, position, timeout);
  }

  warningToast(text:string, position?: SweetAlertPosition, timeout?: number) {
    return this.toast('warning', text, position, timeout);
  }

  confirm(text:string, confirmText?:string, cancelText?:string) {
    return SwalProxy({
      title: text,
      icon: 'question',
      confirmButtonColor: '#0479d9',
      showCancelButton: isNotEmpty(cancelText),
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    }, true);
  }
}
