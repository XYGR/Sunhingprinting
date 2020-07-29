import React from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImagePreview = (props) => {

    let {visible = false,imageUrl = [],close} = props
    return (
        <Modal transparent={true} visible={visible} >
            <ImageViewer
                imageUrls={imageUrl} // 照片路径
                enableImageZoom={true} // 是否开启手势缩放
                saveToLocalByLongPress={true} //是否开启长按保存
                index={0} // 初始显示第几张
                failImageSource={"https://app.sunhingprinting.com/files/notfind.png"} // 加载失败图片
                // loadingRender={this.renderLoad}
                enableSwipeDown={false}
                menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                onClick={close} // 图片切换时触发
            />
        </Modal>
    )
}



export default ImagePreview
