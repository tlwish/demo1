var sort = {
    arrCache: [],
    speed: 500,
    animation: function() {
        var that = this;
        var timer = setInterval(function() {
            if (that.arrCache.length) {
                tmp_arr = that.arrCache.shift();
                sj = tmp_arr.pop();
                si = tmp_arr.pop();
                that.draw(tmp_arr.pop(), si, sj);
            } else {
                clearInterval(timer);
            }
        }, this.speed);
    },
    saveCache: function(arr, si, sj) {
        var tmp_arr = [];
        tmp_arr.push(arr.slice(), si, sj);
        this.arrCache.push(tmp_arr);
    },
    draw: function(asort, si, sj) {
        $("#svg").empty();
        var strBegin = '<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg" version="1.1">';
        var strEnd = '</svg>';
        var str = '';
        for (var i = 0; i < asort.length; i++) {
            if (si === asort.length - 1) {
                color = "rgba(0,0,0,0.5)";
            } else if (sj === i) {
                color = "rgba(255,0,0,0.9)";
            } else if (si === i) {
                color = "rgba(255,0,0,0.4)";
            } else {
                color = "rgba(0,0,0,0.5)";
            }
            str += '<rect x=' + i * 5 + ' y=' + (300 - asort[i]) + ' width="4" height=' + asort[i] + ' fill="' + color + '"/>';
        };
        str = strBegin + str + strEnd;
        $("#svg").append(str);
    },
    bubbleSort: function(arr) {
        for (var i = 0, length = arr.length; i < length; i++) {
            for (var j = 0; j < i; j++) {
                if (arr[j] > arr[i]) {
                    var tmp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = tmp;
                    this.saveCache(arr, i, j);
                }
            }
        }
    },
    insertSort: function(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                var tmp = arr[i];
                var j = i - 1;
                arr[i] = arr[i - 1];
                this.saveCache(arr, i, i - 1);
                while (tmp < arr[j]) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = tmp;
                this.saveCache(arr, i, j + 1);
            }
        }
    },
    shellSort: function(arr) {
        m = Math.floor(arr.length / 2)
        while (m) {
            for (var i = m, length = arr.length; i < length; i++) {
                if (arr[i] < arr[i - m]) {
                    var tmp = arr[i];
                    var j = i - m;
                    arr[i] = arr[i - m];
                    this.saveCache(arr, i, i - m);
                    while (tmp < arr[j]) {
                        arr[j + m] = arr[j];
                        j = j - m;
                        this.saveCache(arr, j + m, j);
                    }
                    arr[j + m] = tmp;
                }
                this.saveCache(arr, i, j + m);
            }
            m = Math.floor(m / 2)
        }
    },
    selectSort: function(arr) {
        for (var i = 0, length = arr.length; i < length; i++) {
            var k = i;
            for (var j = i + 1; j < length; j++) {
                if (arr[k] > arr[j]) {
                    k = j;
                }
            }
            if (k !== i) {
                var tmp = arr[i];
                arr[i] = arr[k];
                arr[k] = tmp;
            }
            this.saveCache(arr, i, k);
        }
    },
    drawNow:function(method,arr){
    	this.arrCache=[];
    	this[method](arr);
    	this.animation();
    }
}


$(function() {
    $('#createData').click(function() {
    	$('#showData').empty();
    	var arr=[];
	    for(i=0;i<100;i++){
	    	arr.push(Math.ceil(Math.random()*200));
	    }
	    $('#showData').append(arr.join(' '));
	    sort.draw(arr);
	    sort.arrCache=[];
	    $('li').click(function(){
	    	sort.drawNow(this.id,arr.slice());
	    })
    })

});
