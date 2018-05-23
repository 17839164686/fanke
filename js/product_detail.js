define(['jquery','cookie','nav',], function(jq) {
    $("nav>ul>li").has(".subNav").nav();
    //判断是否登录的js
    var username = $.cookie("username");
    if(username){
        $(".hd_login").children(".hide").hide();
        $(".hd_login").children(".hd_username").html("您好！<span>"+username+"</span>，您已成功登录");
    }
    //放大镜
    function Magnifier(options){
		this.small_ele = $(options.small_ele);
		this.focus_ele = $(options.focus_ele);
		this.big_ele = $(options.big_ele);
		if(this.small_ele.length==0||this.focus_ele.length==0||this.big_ele==0)return;
		this.init();
	}
	Magnifier.prototype = {
		constructor:Magnifier,
		init(){
			this.scale_init();
			//鼠标移入小图
			this.small_ele.on("mouseenter",{flag:true},$.proxy(this.toggleImg,this));
			this.small_ele.on("mouseleave",{flag:false},$.proxy(this.toggleImg,this));
			//鼠标移动，并让大小图跟着动
			this.small_ele.on("mousemove.mouse_move",$.proxy(this.mouse_move,this));
			//鼠标滚动滚轮
			//兼容谷歌
			this.small_ele[0].onmousewheel = function(event){
				var evt = event||window.event;
				this.scale("ch",evt.wheelDelta);
			}.bind(this)
			//火狐兼容
			this.small_ele[0].addEventListener("DOMMouseScroll",function(event){
				this.scale("ff",event.detail);
			}.bind(this));
		},
		//控制大图小图的显示与隐藏
		toggleImg(event){
			var opacity_img = this.small_ele.find(".opacity_img");
			if(event.data.flag){
				this.focus_ele.show();
				//设置图片的透明度
				opacity_img.fadeTo(0,0.3);
				this.big_ele.show();
			}else{
				this.focus_ele.hide();
				//设置图片的透明度
				opacity_img.fadeTo(0,1);
				this.big_ele.hide();
			}
		},
		//获取鼠标的坐标，并保存
		mouse_move(event){
			this.eleX = event.offsetX;
			this.eleY = event.offsetY;
			this.img_move();
		},
		//大、小图运动(根据坐标点运动)
		img_move(){
			var eleX = this.eleX-this.focus_ele.width()/2;
			var eleY = this.eleY-this.focus_ele.width()/2;
			//边界检测
			var max_width = this.small_ele.width()-this.focus_ele.width();
			var max_height = this.small_ele.height()-this.focus_ele.height();
			eleX = eleX<0?0:eleX;
			eleX = eleX>max_width?max_width:eleX;
			eleY = eleY<0?0:eleY;
			eleY = eleY>max_height?max_height:eleY;
			//让小框动 和 小框里的背景图运动
			this.focus_ele.css({
				left:eleX,
				top:eleY,
				backgroundPosition:`${-eleX}px ${-eleY}px`
			});
			//让大图运动(大图运动涉及比例问题)
			this.bigImg.css({
				left:Math.round(-eleX*this.bili_width),
				top:Math.round(-eleY*this.bili_height)
			});
			
		},
		//计算比例，根据比例初始化大图的图片宽和高
		scale_init(){
			//小框和小图的比例
			this.bili_width = this.small_ele.width() / this.focus_ele.width();
			this.bili_height = this.small_ele.height() / this.focus_ele.height();
			this.bigImg = this.big_ele.find("img");
			this.bigImg.css({
				width:Math.round(this.big_ele.width()*this.bili_width),
				height:Math.round(this.big_ele.height()*this.bili_height)
			});
		},
		//改变小框的大小（并从新让大小图片运动，）
		scale(browser_type,data){
			//传递参数为鼠标滚轮 事件 处理函数 ;
			//滚轮逻辑;
			//向下滚是变小的;
			//向上滚是变大的;
			//方向
			var turn=0;
			//谷歌的
			if(browser_type=="ch"){
				data>0?turn=1:turn=-1;
			}else if(browser_type=="ff"){
				//火狐的
				data>0?turn=-1:turn=1;
			}
			var focus_width = this.focus_ele.width();
			var focus_height = this.focus_ele.height();
			//改变小框的大小
			if(focus_width >= this.small_ele.width() * 0.6&&turn>0||focus_width<=this.small_ele.width() * 0.2&&turn<0)return;
			this.focus_ele
			.css({
				width:focus_width+turn*2,
				height:focus_height+turn*2,
			})
			this.scale_init();
			this.img_move();
		}
	}

	new Magnifier({
		"small_ele":".small",
		"focus_ele":".grayBox",
		"big_ele":".big"
    });
    //加入购物车
    $(function(){
              function ShopCar(url){
                  this.url = url;      
                  this.init();
              };
              ShopCar.prototype = {
                  constructor:ShopCar,
                  init(){
                      this.loading()
                      .then(function(res){
                          this.json = res.productcode;
                          console.log(res);                 
                      }.bind(this))
                      this.carNum = $("#shoppingcar_link span");
                      this.carNum.html(this.getSum());
                      $(".btnaddtocart").on("click.addCar",$.proxy(this.addCar,this));
                    //   $("#shoppingcar_link").on("click.changeNum",$.proxy(this.changeNum,this))
             },
                loading(){
                            var opt = {
                                url: this.url,
                                dataType:"jsonp"
                            }
                            return $.ajax(opt);
                        },
                addCar(event){
                    //获取当前点击的元素。
                    var target = event.target || event.srcElement;
                    var productId= $(target).attr("productcode");              
                    //console.log(target);
                    //操作cookie存入购物车
                    if(!$.cookie("shopCar")){
                        //表示是第一次存数据；
                        var shopCarArray = [
                            {
                                id:productId,
                                num:1
                            }
                        ]
                        $.cookie("shopCar",JSON.stringify(shopCarArray))
                       // console.log($.cookie("shopCar"));
                       return 0;
                    }
                    //其余次数进行购物车添加
                    //id是否在购物车之中存在；
                    var shopCarString = $.cookie("shopCar");
                    var shopCarArray = JSON.parse(shopCarString);
                    var hasItem = false;
                    shopCarArray.forEach(function(item){
                        //如果购物车列表之中有当前项，让商品数量自增就可以了；
                        if(item.id == productId){
                            item.num ++;
                            hasItem = true;
                        }
    
                    })
                    if(!hasItem){
                        var item = {
                            id:goodsId,
                            num:1
                        }
                        shopCarArray.push(item)
                    }
                    $.cookie("shopCar",JSON.stringify(shopCarArray));
                    this.changeNum();
    
                },
                changeNum(){
                    this.carNum.html(this.getSum());
    
                },
                getSum(){
                    var shopCarString = $.cookie("shopCar");
                    if(shopCarString){
                        var shopCarArray = JSON.parse(shopCarString);
                    var sum = 0;
                    shopCarArray.forEach(function(item){
                        sum += Number(item.num);
    
                    })
                    return sum;
    
                    }
                    return 0;               
                }
              }
              new ShopCar("http://recom-s.vancl.com/product/GetCurrentRecommendProducts?");         
          })

});