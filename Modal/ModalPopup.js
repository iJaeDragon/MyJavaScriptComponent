class ModalPopup {
    constructor(filePath) {
        this.filePath = filePath; // 호출할 파일 경로
        this.callBackMethod = function(){}; // 콜백 메서드

        // 사이즈
        this.width = 100;
        this.height = 100;

        // 모달 타이틀
        this.title = "";

        // 컨텐츠를 iFrame으로 제공할지 여부
        this.iframe = false;

        // 최상위 모달 컨테이너
        this.modalRootContainer = undefined;

        this.modalClose = this.modalClose.bind(this);
    }

    // 팝업을 닫는 함수
    modalClose = function(callBackData) {
        if(this.modalRootContainer != undefined) {
            document.body.removeChild(this.modalRootContainer);
            this.modalRootContainer = undefined;
            this.callBackMethod(callBackData);
        }
    }

    // 팝업을 여는 함수
    modalOpen = function() {
        this.showModalContent(this.filePath);
    }

    setCallBackMethod = function(method) {
        if(!(typeof method === 'function')) {
            throw new TypeError("callBackMethod must be a function.");
        }
        this.callBackMethod = method;
    }

    showModalContent = function(filePath) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.style.position = 'fixed';
        modalContainer.style.top = '0';
        modalContainer.style.left = '0';
        modalContainer.style.width = '100%';
        modalContainer.style.height = '100%';
        modalContainer.style.backgroundColor = 'rgba(0,0,0,0.3)';
        modalContainer.style.backdropFilter = 'blur(10px)';
        modalContainer.style.zIndex = '9999';
        document.body.appendChild(modalContainer);

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.position = 'absolute';
        modalContent.style.top = '50%';
        modalContent.style.left = '50%';
        modalContent.style.transform = 'translate(-50%, -50%)';
        modalContent.style.width = `${this.width}px`;
        modalContent.style.height = `${this.height}px`;
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.borderRadius = '8px';
        modalContent.style.overflow = 'hidden';
        modalContainer.appendChild(modalContent);

        // Create modal header
        const modalHeader = document.createElement('div');
        modalHeader.style.display = 'flex';
        modalHeader.style.justifyContent = 'space-between';

        modalHeader.style.padding = '10px';
        modalHeader.style.cursor = 'move';
        modalHeader.style.backgroundColor = '#f2f2f2';
        modalContent.appendChild(modalHeader);

        // Create close button
        const titleLabel = document.createElement('span');
        titleLabel.innerHTML = this.title;
        titleLabel.style.fontSize = '20px';
        titleLabel.style.fontWeight = 'bold';
        titleLabel.style.flex = '1';
        modalHeader.appendChild(titleLabel);

        // Create close button
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.style.fontSize = '20px';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.cursor = 'pointer';
        modalHeader.appendChild(closeButton);

        // Event listener for dragging the modal
        let isDragging = false;
        let offsetX, offsetY;

        modalHeader.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.clientX - parseFloat(window.getComputedStyle(modalContent).left);
            offsetY = e.clientY - parseFloat(window.getComputedStyle(modalContent).top);
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                const newLeft = e.clientX - offsetX;
                const newTop = e.clientY - offsetY;

                modalContent.style.left = `${newLeft}px`;
                modalContent.style.top = `${newTop}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        // Event listener for closing the modal
        closeButton.addEventListener('click', this.modalClose);

        // Create resize handle
        const resizeHandle = document.createElement('div');
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.width = '10px';
        resizeHandle.style.height = '10px';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.right = '0';
        resizeHandle.style.cursor = 'se-resize';
        resizeHandle.style.backgroundColor = '#000';
        modalContent.appendChild(resizeHandle);

        // Event listener for resizing the modal
        let isResizing = false;
        let originalWidth, originalHeight;

        resizeHandle.addEventListener('mousedown', function (e) {
            isResizing = true;
            originalWidth = modalContent.offsetWidth;
            originalHeight = modalContent.offsetHeight;
            offsetX = e.clientX;
            offsetY = e.clientY;
        });

        document.addEventListener('mousemove', function (e) {
            if (isResizing) {
                const newWidth = originalWidth + e.clientX - offsetX;
                const newHeight = originalHeight + e.clientY - offsetY;

                modalContent.style.width = `${Math.max(newWidth, 100)}px`;
                modalContent.style.height = `${Math.max(newHeight, 100)}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            isResizing = false;
        });

        // Load content from another HTML file
        const contentUrl = filePath;
        fetch(contentUrl)
            .then(response => response.text())
            .then(html => {


                if(this.iframe) {
                    const iframe = document.createElement('iframe');
                    modalContent.appendChild(iframe);

                    // iFrame 스타일
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.frameBorder = '0';

                    // 'this' (myObject 인스턴스)를 iframe의 window 객체에 추가
                    iframe.contentWindow.parent = this;

                    // iFrame 내부에 HTML 삽입
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(html);
                    iframe.contentDocument.close();
                } else {
                    const modalBody = document.createElement('div');
                    modalBody.style.padding = '10px';
                    modalBody.innerHTML = html;
                    modalContent.appendChild(modalBody);
                }

                this.modalRootContainer = modalContainer;
            })
            .catch(error => {
                console.error('Error loading content:', error)
            });
    }
}