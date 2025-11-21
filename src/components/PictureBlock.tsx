function PictureBlock({img_src} : {img_src : string, test : string}) {
    <div className="picture_block">
        <img src={img_src}></img>
    </div>
}

export default PictureBlock