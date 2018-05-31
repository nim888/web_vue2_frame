class ImageSelector {
    /**
     * 实例化
     * @param {number} quality 图片质量 1-100
     */
    constructor(quality = 100) {
        this._quality = Math.max(1, Math.min(quality, 100)) / 100;
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
    }

    _createInput() {
        let input = document.createElement('input');
        input.accept = 'image/*';
        input.type = 'file';

        return input;
    }
    _onCompress(file, cb) {
        if (!file) {
            return cb && cb('没有选择文件');
        }

        switch (file.type) {
            case 'image/png':
            case 'image/gif':
            case 'image/jpeg':
                break;
            default:
                return cb && cb('请选择图片文件');
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onerror = _ => cb && cb('无法读取图片');
        reader.onload = _ => {
            // base64 data
            let imgBase64Data = reader.result;
            let img = new Image();
            img.src = imgBase64Data;

            img.onerror = _ => cb && cb('无法读取图片');
            img.onload = _ => {
                this._canvas.width = img.width;
                this._canvas.height = img.height;
                this._ctx.drawImage(img, 0, 0);

                cb && cb(null, this._canvas.toDataURL(file.type, this._quality));
            };
        };
    }

    show(cb) {
        let input = this._createInput();

        input.onchange = e => {
            if (!e || !e.srcElement) {
                return cb && cb('无法选择文件');
            }

            let file = e.srcElement.files[0];

            // 压缩图片
            this._onCompress(file, cb);
        };

        input.click();
    }
}

export default ImageSelector;