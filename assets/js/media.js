const sliders = $('.carouselbox')[0];
const key = "ac7e762bb0a6a2b3bf63ec1566fb8c98";
const ImagePadding = 20;
const scrollPerClick = 200;
let scrollAmount = 0;


fetchMovie();



function fetchMovie() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR`;

    fetch(url)
        .then(res => res.json())
        .then(function (res) {
            const result = res.results;
            $.each(result, function (index, item) {
                $('#box').append(`<div onclick="openView(this)" id="${item.id}"><img id="img-${index}" class="slider-img" src="https://image.tmdb.org/t/p/w185/${item.poster_path}" /></div>`);
                $('#' + item.id).append(`<h3 class="titles">${item.title}</h3>`);
            });
        })
        .catch(erro => console.log(erro));
};

function openView(e) {
    const movieId = e.getAttribute("id");
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}`;
    fetch(movieUrl)
        .then(res => res.json())
        .then(function (res) {
            if (res.results.length > 0) {
                const id = res.results[0].key;
                $('#youtube').html(`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1"></iframe>`);
            } else
                $('#youtube').html(`<h3 class="noVideo">비디오를 찾지 못했습니다.</h3>`);
        })
        .catch(erro => console.log(erro));
    $('#overlay').addClass('show');
}

$('#close').on({
    click: function () {
        $('#youtube').html('');
        $('#overlay').removeClass('show');
    }
});

$('#left').on({
    click: function () {
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount -= scrollPerClick + ImagePadding),
            behavior: "smooth"
        });
        if (scrollAmount <= 0) {
            scrollAmount = 0;
            $('#left').css({ '-moz-transition': 'background, 0.3s','-o-transition':'background, 0.3s', '-webkit-transition':'background, 0.3s','background-color':'gray'});
        }
        $('#right').css({ '-moz-transition': 'background, 0.3s', '-o-transition': 'background, 0.3s', '-webkit-transition': 'background, 0.3s', 'background-color': 'lightgreen'});
    }
});

$('#right').on({
    click: function () {
        if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
            sliders.scrollTo({
                top: 0,
                left: (scrollAmount += scrollPerClick + ImagePadding),
                behavior: "smooth",
            });
        }
        else {
            $('#right').css({ '-moz-transition': 'background, 0.3s', '-o-transition': 'background, 0.3s', '-webkit-transition': 'background, 0.3s' ,'background-color': 'gray'});
        }
        $('#left').css({ '-moz-transition': 'background, 0.3s', '-o-transition': 'background, 0.3s', '-webkit-transition': 'background, 0.3s','background-color': 'lightgreen'});
    }
})




/* 비동기 처리
async function showMovieData() {
    let result = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=" + key + "&sort_by=popularity.desc"
    );

    //api.themoviedb.org/3/movie/{비디오id}/videos?api_key={Your key}

    result = result.data.results;
    $.each(result, function (index, item) {
        box.append(`<a class=link href="https://www.youtube.com/results?search_query=${item.original_title}"><img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${item.poster_path}"/></a>`);
        console.log(item);
    });
}
*/