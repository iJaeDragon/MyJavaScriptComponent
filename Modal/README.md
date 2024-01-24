## 호출 예

```
const layerPopup = new ModalPopup("/page.do");
		        layerPopup.width = 900;
		        layerPopup.height = 600;
		        layerPopup.title = "페이지";
		        layerPopup.iframe = true; // iframe으로 띄워야 하는 경우 
		        layerPopup.callBackMethod = function(data) {
		        	alert("팝업 닫힘");
		        }
		        layerPopup.modalOpen();
```

## 팝업 내 닫기 호출

```
window.parent.window.parent.modalClose('callData');
```
