<?php 
    // session_start();
    header("Access-Control-Allow-Origin:*");

    $image = imagecreatetruecolor(100,30);
    //创建图片画布

    $bgcolor = imagecolorallocate($image,255,255,255);
    //创建背景颜色

    imagefill($image,0,0,$bgcolor);
    // 背景填充画布

    $code="";

    for($a=0;$a<4;$a++){
        $data = 'abjdefghijklmnopqrstuvwxyz1234567890';

        $f = substr($data,rand(0,strlen($data)),1);
        //随机截取一个字符

        $code.=$f;

        $fcolor = imagecolorallocate($image,80,0,80);
        //设置文字颜色

        $x = $a*25+rand(5,12);
        $y = rand(5,12);
        
        imagestring($image,20,$x,$y,$f,$fcolor);
        // 文件写入画布（图像资源，文字大小，x坐标，y坐标，文字，文字颜色）
    }
    $_SESSION["code"] = $code;

    header("content-type:image/png");
    //告诉浏览器创建的是图片

    imagepng($image);
    //创建输出图片
?>