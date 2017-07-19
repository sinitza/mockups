;(function slider() {

    var slider = document.getElementsByClassName('slider')[0],
        slides = slider.querySelectorAll('ul li'),
        current = 0,
        eventOffsetX = 0;

    var paginator = document.createElement('ul');
    paginator.classList.add('slider-paginator');
    for (var i = 0; i < slides.length; i++) {
        var li = document.createElement('li');
        paginator.appendChild(li);
    }
    slider.appendChild(paginator);

    document.addEventListener('keyup', handleEvent);
    slider.addEventListener('touchstart', handleEvent);
    slider.addEventListener('touchend', handleEvent);
    slider.addEventListener('mousedown', handleEvent);
    slider.addEventListener('mouseup', handleEvent);
    slider.querySelector('.prev').addEventListener('click', handleEvent);
    slider.querySelector('.next').addEventListener('click', handleEvent);
    paginator.addEventListener('click', handleEvent);
    slides[0].classList.add('active');

    function handleEvent(event) {
        switch (event.type) {
            case 'keyup': {
                if (event.key === 'ArrowLeft') {
                    move(-1);
                } else if (event.key === 'ArrowRight') {
                    move(1);
                }
            } break;
            case 'click': {
                if (event.target.classList.contains('next')) {
                    move(1);
                } else if (event.target.classList.contains('prev')) {
                    move(-1);
                } else if (event.currentTarget.classList.contains('slider-paginator')) {
                    [].forEach.call(paginator.childNodes, function (li, idx) {
                        if (li == event.target) {
                            current = idx;
                            move(0);
                        }
                    });
                }
            } break;
            case 'touchstart': {
                eventOffsetX = event.touches[0].pageX;
            } break;
            case 'touchend': {
                if (event.changedTouches[0].pageX < eventOffsetX) {
                    move(1);
                } else if (event.changedTouches[0].pageX > eventOffsetX)  {
                    move(-1);
                }
            } break;
            case 'mousedown': {
                eventOffsetX = event.clientX;
                event.preventDefault();
            } break;
            case 'mouseup': {
                if (event.clientX < eventOffsetX) {
                    move(1);
                } else if (event.clientX > eventOffsetX)  {
                    move(-1);
                }
            } break;
        }
    }

    function move(dx) {
        console.log('MOVE', dx);
        current += dx;
        if (current < 0) {
            current = slides.length - 1;
        }
        if (current >= slides.length) {
            current = 0;
        }
        slides.forEach(function (slide, idx) {
            if (current === idx) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        })
    }
})();
