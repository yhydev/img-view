require("../sass/index.scss")
var template = require("../template/imgView.html")


var jQuery = require("jQuery")


jQuery.fn.extend({
    "imgView": function(options) {

        var thisobj = this;
        var autoLoad = options.autoLoad == undefined ? false : true;
        var currentElement = options.current ? options.current : thisobj[0];

        var loaderOptions = function() {
            if (autoLoad) {
                thisobj = $(thisobj.selector);
            }
        }

        var prevElement = function() {
            loaderOptions();
            var ele = null;

            for (var i = 0; i < thisobj.length; i++) {
                if (thisobj[i] == currentElement) {
                    if (i == 0) {
                        ele = thisobj[thisobj.length - 1];
                    } else {
                        ele = thisobj[i - 1];
                    }
                }
            }

            currentElement = ele;

            return ele;
        }

        var nextEle = function() {
            loaderOptions();
            var ele = null;

            for (var i = 0; i < thisobj.length; i++) {
                if (thisobj[i] == currentElement) {
                    if (i == (thisobj.length - 1)) {
                        ele = thisobj[0];
                    } else {
                        ele = thisobj[i + 1];
                    }
                }
            }

            currentElement = ele;

            return ele;
        }


        //get template 
/*        template = template ? template : $.ajax({
            url: "./template/imgView.html",
            type: "get",
            async: false
        }).responseText;*/



        var $imgView = $(template);

        $img = $imgView.find(".img-view-pic img");
        var setPic = function(url) {

            var img = new Image();
            img.src = url;
            img.onload = function() {
                var height = img.height;
            	console.log(height)

                var outPx = (600 - height);
                if(outPx > 0){
                	$img.height("auto");
                	$img.css("margin-top", outPx / 2);
                }else{
                	$img.css("margin","auto");
                	$img.height(600);
                }
                $img.attr("src",url)




            }


            /*
            		var height = $img.attr("visibility","hidden").attr("src",img).height();
            		var outPx = (600 - height);
            		console.log(outPx)
            		var top = outPx < 0 ? 0 : outPx / 2;
            		$img.css("margin-top",top).show();*/

        }

        var url = this.attr("src");
        setPic(url);

        $imgView.find(".img-view-close").click(function() {
            $(".img-view-container").remove();
        })


        $imgView.find(".img-view-slider-left").click(function() {
            setPic(prevElement().src)
        })

        $imgView.find(".img-view-slider-right").click(function() {
            setPic(nextEle().src)
        })

        $(document.body).append($imgView)



















    }
})