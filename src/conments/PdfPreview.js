import React from 'react';
import {Modal, StyleSheet, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfPreview = (props) => {

    let {visible = false,url,close} = props

    return (
        <Modal transparent={true} visible={visible} style={styles.container} >
            <Pdf
                source={{
                    uri:url
                }}
                fitWidth={true} //默认 false，若为 true 则不能将 fitWidth = true 与 scale 一起使用
                fitPolicy={2} // 0:宽度对齐，1：高度对齐，2：适合两者（默认）
                page={1} //初始化第几页，1 开始
                scale={1} //页面加载出来 pdf 时的比例
                minScale={1} //最小模块
                maxScale={3} //最大模块
                onError={(error)=>{
                }}
                onPageSingleTap={close}
                spacing={10} // 页面之间的间隔大小，默认为 10
                horizontal={true} //横向
                activityIndicator={null}
                // activityIndi​​catorProps={{backgroundColor:'red'}} 文档里有这个属性，但是我看源码里面没有
                enablePaging={true} //在屏幕上只能显示一页
                enableAntialiasing={true} //在低分辨率屏幕上改进渲染，针对 Android 4.4 上可能会出现的一些问题
                enableRTL={false} //倒序滑动
                style={styles.pdf}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});

export default PdfPreview
