var UserPosition = {x: 15, y: 20};

var id_cinema = 0;
function init_cinema(name, list_films, GPS_position, information) {
    information = information || {};
    GPS_position = GPS_position || {x: 0, y: 0};
    id_cinema += 1;
    return {
        id_cinema: id_cinema - 1,
        name: name,
        list_films: list_films,
        GPS_position: GPS_position,
        information: information
    };
}

var cinemas = [{name: "Салют", movies: ["Black Comedy Shorts", "Бабадук", "Барашек Шон", "Дивергент, глава 2: Инсургент", "Золушка"]},
               {name: "Титаник Синема", movies: ["Барашек Шон", "Батальонъ", "Дивергент, глава 2: Инсургент", "Машина времени в джакузи 2", "Золушка"]},
               {name: "Синема Парк Starlight на Урале", movies: ["Барашек Шон", "МУЛЬТ в кино. Выпуск №1", "Дивергент, глава 2: Инсургент", "Машина времени в джакузи 2", "Робот по имени Чаппи"]},
               {name: "Колизей", movies: ["Золушка", "Дом", "Дивергент, глава 2: Инсургент", "Машина времени в джакузи 2", "Робот по имени Чаппи", "Ледяной лес"]}].map(
        function (cinema) {
            return init_cinema(cinema.name, cinema.movies, {x: Math.random() * 100, y: Math.random() * 100});
        }
    );
console.log(cinemas);

var manager = {};


manager.findByFilmName = function (film) {
    var film_in_cinemas = [];
    cinemas.forEach(function (cin, index_cinema, array_cin) {
        if (cin.list_films.some(function (mov, index_movie, array_mov) {
                return mov === film;
            })) {
            film_in_cinemas.push({name: cin.name, information: cin.information,
                GPS_position: cin.GPS_position, distance: (UserPosition.x - cin.GPS_position.x) * (UserPosition.x - cin.GPS_position.x)
                + (UserPosition.y - cin.GPS_position.y) * (UserPosition.y - cin.GPS_position.y) });
        }
    });
    return film_in_cinemas;
};
console.log(manager.findByFilmName("Барашек Шон"));

manager.sortByUserPosition = function (film) {
    var film_in_cinemas = manager.findByFilmName(film);
    film_in_cinemas.sort(function (a, b) {
        if (a.distance > b.distance) {
            return 1;
        }
        if (a.distance < b.distance) {
            return -1;
        }
        return 0;
    });
    return film_in_cinemas;
};

console.log(manager.sortByUserPosition("Барашек Шон"));