/* =============================== load Begin =============================== */
function loadScript(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status === 200) {
        eval(xhr.responseText);
    } else {
        console.error('Failed to load script:', url, xhr.status, xhr.statusText);
    }
}

loadScript('./lib/sweetalert2.js');
/* =============================== load End =============================== */

/* =============================== Custom Method =============================== */

const customSwalMethod = {
    confirm: function(text, confirmButtonText, cancelButtonText, confirmClickEvent) {
    	Swal.fire({
            title: "알림",
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            confirmButtonColor: "#367fa9",
            cancelButtonText: cancelButtonText,
            cancelButtonColor: "#808080"
        }).then((result) => {
            if (result.isConfirmed) {
            	confirmClickEvent();
            }
        });
    },

	warning: function(bodyHtml, confirmEvent) {
		let timeLeft = 5000;
        Swal.fire({
        	icon: "warning",
            title: '주의사항',
            html: bodyHtml + `
            		<br/>
            		닫기 버튼 활성화: <b></b>
                   `,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector('b');
                b.textContent = timeLeft / 1000
                const timerInterval = setInterval(() => {
                    timeLeft -= 1000; // 매 초마다 감소
                    b.textContent = timeLeft / 1000;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        Swal.hideLoading();
                        Swal.update({
                            html: bodyHtml,
                            showConfirmButton: true,

                        });
                    }
                }, 1000);
            },
            showConfirmButton: false
        }).then(function(result) {
            if (result.isConfirmed) {
            	confirmEvent();
            }
        });
	},
	
	error: function(msg) {
		Swal.fire({
			  icon: "error",
			  title: "에러 발생",
			  text: msg
			});
	},

    confirm: function(msg) {
        Swal.fire({
            title: msg,
            icon: "question",
            iconHtml: "؟",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (!result.isConfirmed) {
                alert("test");
            }
        });
    }
}

/* =============================== Custom End =============================== */