(function () {
    function Init(options) {
        // 保存父元素 即轮播图要插入的位置
        this.parent = options.parent;
        // 储存用户要轮播的所有图片
        this.images = options.images;
        // 轮播方向
        this.diration = options.diration || 'next';
        // 每张图片的宽度
        this.width = options.width || $(this.parent).width();
        // 高度
        this.height = options.height || $(this.parent).height();
        // 轮播时间
        this.autotime = options.autotime || 1500;
        // 索引
        this.index = options.index || 0;
        this.lock = false;
        this.timer = null;
        this.num = options.images.length;
        this.creatDom()
        this.addCss()
        this.bindevent()
        this.automove()
        this.change()
    }
    Init.prototype.creatDom = function(){
        var img = $('<ul class="imgContent"></ul>')
        var indexPage = $('<div class="indexPage"></div>')
        for(var i = 0; i < this.num; i++){
           $('<li><img src="'+ this.images[i]+'"/></li>').appendTo(img);
           $('<div></div>').appendTo(indexPage);
        }
        img.append($('<li><img src="'+ this.images[0]+'"/></li>'))
        $(this.parent).append(img)
                       .append($('<div class="btn leftBtn">&lt;</div>'))
                       .append($('<div class="btn rightBtn">&gt;</div>'))
                       .append(indexPage)
    }
    Init.prototype.addCss = function() {
        $('.imgContent',this.parent).css({
            position: 'absolute',
            width: this.width * (this.num + 1),
            left: 0
        });
        $('.imgContent > li',this.parent).css({
            width: this.width,
            height: this.height,
            float: 'left',
        });
        $('.imgContent > li >img',this.parent).css({
            width:' 100%',
            height: '100%',
        })
        $('.btn',this.parent).css({
            position: 'absolute',
            width: 40,
            height: 40,
            top: '50%',
            marginTop: -20,
            textAlign: 'center',
            lineHeight: '40px',
            background: 'black',
            color: '#ffffff',
            opacity: 0.6,
            cursor: 'pointer',
            display: 'none',
        })
        $('.btn.leftBtn',this.parent).css({
            left:0
        })
        $('.btn.rightBtn',this.parent).css({
            right:0
        })
        $('.indexPage',this.parent).css({
            position: 'absolute',
            width: '100%',
            bottom: '15px',
            textAlign: 'center',
        })
        $('.indexPage > div',this.parent).css({
            width: 8,
            height: 8,
            display: 'inline-block',
            backgroundColor: '#ccc',
            borderRadius: '50%',
            marginRight: '5px',
            cursor: 'pointer',
        })
    }
    Init.prototype.bindevent = function () {
        var self = this;
        $(this.parent).hover(function () {
            $('.btn',self.parent).fadeIn()
            clearInterval(self.timer)
        }, function () {
            $('.btn',self.parent).fadeOut()
           self.automove()
        });
        $(this.parent).on('click', '.btn', function (e) {
            if ($(this).hasClass('leftBtn')) {
                self.move('perv');
            } else if ($(this).hasClass('rightBtn')) {
                self.move('next');
            }
        })
        $('.indexPage',self.parent).on('click', 'div', function (e) {
           self.move($(this).index())
        })

    }
    Init.prototype.move = function (dir) {
        if (this.lock) {
            return false
        }
        this.lock = true;
        var self= this;
        if (dir == 'perv') {
            if (this.index == 0) {
                this.index = this.num;
                $('.wrapper > ul').css({ 'left': - this.index * this.width })
            }
            this.index--;
            $('ul',this.parent).animate({
                'left': -this.index * this.width
            }, 1000, function () {
                self.change(self.index)
                self.lock = false;
            })
        } else if (dir == 'next') {
            if (dir == 'next') {
                if (this.index == this.num) {
                    this.index = 0;
                    $('ul',this.parent).css({ 'left': - this.index * this.width })
                }
                this.index++;
                $('ul',this.parent).animate({
                    'left': -this.index * this.width
                }, 1000, function () {
                    self.change(self.index)
                    self.lock = false;
                })
            }
        } else if (typeof dir == 'number') {
            this.index = dir;
            $('ul',this.parent).animate({
                'left': -this.index * this.width
            }, 1000, function () {
                self.change(self.index)
                self.lock = false;
            })
        }
    }
    Init.prototype.automove = function () {
        var self = this;
        this.timer = setInterval(function () {
           self.move('next')
        }, this.autotime)

    }
    Init.prototype.change = function () {
       $('.indexPage > div',this.parent).css({'background':'#fff'});
       if(this.index == this.num){
          $('.indexPage > div',this.parent).eq(0).css({'background':'#f40'})
       }else{
        $('.indexPage > div',this.parent).eq(this.index).css({'background':'#f40'})
       }
    }
  
    $.fn.extend({
        swiper: function (options) {
            options.parent = this;
           var swiper=  new Init(options)
        }
    })
} ());