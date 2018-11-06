require(['jquery', 'flex', 'bscroll', 'swiper', 'ajax'], function($, flex, scroll, swiper, ajax) {
    var swipers = new swiper('.swiper-container');
    var bscroll = new scroll('.content', {
        probeType: 2,
        click: true
    });

    init() //初始化；

    var upH = $('.up').height() / 2;
    var downH = $('.down').height() / 2;
    bscroll.on('scroll', function() {
        if (this.y > upH) {
            $('.up').text('释放刷新').addClass('fill')
        } else if (this.y < upH) {
            $('.up').text('下拉刷新')
        }
        if (this.y < this.maxScrollY - downH) {
            $('.down').text('上拉释放').addClass('fill')
        } else if (this.y > this.maxScrollY) {
            $('.down').text('上拉加载')
        }
    })
    bscroll.on('scrollEnd', function() {
        if ($('.up').hasClass("fill")) {
            $('.up').text('下拉刷新').removeClass("fill");
            up()
        } else if ($('.down').hasClass("fill")) {
            $('.down').text('上拉加载').removeClass("fill");
            down()
        }
    })




    function init() {
        ajax.ajax({
            url: '../data/data.json',
            success: function(data) {
                var data = JSON.parse(data);
                rander(data)
            }
        })
    }

    function rander(data) {
        if (data.code == 0) {
            var str = ``;
            data.result.forEach(function(file) {
                str += `  <dl>
                <dd>
                    <h4>${file.titname}</h4>
                    <p>${file.order}</p>
                </dd>
                <dt><img src=${file.img} alt=""></dt>
            </dl>`
            })
            bscroll.refresh();
            $('.productlist').append(str);
        }
    }

    function up() {
        $('.productlist').html('')
        init()
    }

    function down() {

        init()
    }

})