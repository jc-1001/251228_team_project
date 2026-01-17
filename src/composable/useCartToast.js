import Swal from 'sweetalert2'

export function useToast() {
  const showToast = (title = '已加入購物車!') => {
    Swal.fire({
      iconHtml: '<span class="material-symbols-rounded point_remind_icon">check_circle</span>',
      iconColor: '#2E6669',
      title: title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      background: '#E7F3E5',
      
      customClass: {
        container: 'my-toast-container', 
        popup: 'my-toast-offset my-anim-show', 
      },

      // 動畫設定
      showClass: { popup: '' },
      hideClass: { popup: 'my-anim-hide' },
    })
  }

  return { showToast }
}