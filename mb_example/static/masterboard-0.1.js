// Used to generate sample data
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

sample =  [
    {'id': 1, 'img': 'http://placehold.it/50x50', 'name': 'John Doe', 'score': 60},
    {'id': 2, 'img': 'http://placehold.it/50x50', 'name': 'Someone Lame', 'score': 50},
    {'id': 3, 'img': 'http://placehold.it/50x50', 'name': 'John Smith', 'score': 70},
    {'id': 4, 'img': 'http://placehold.it/50x50', 'name': 'Brandon Birkholz', 'score': 100},
    {'id': 5, 'img': 'http://placehold.it/50x50', 'name': 'Jane Smith', 'score': 80},
    {'id': 6, 'img': 'http://placehold.it/50x50', 'name': 'Someone else', 'score': 90},
    {'id': 7, 'img': 'http://placehold.it/50x50', 'name': 'Another Fail', 'score': 20},
    {'id': 8, 'img': 'http://placehold.it/50x50', 'name': 'Some Fool', 'score': 10}
];

function ModSample(sample){
    var new_sample = [];
    for (i in sample){
        var row = sample[i];
        row['score'] += getRandomArbitrary(-10, 10);
        if (row['score'] < 0) row['score'] = 0;
        else if (row['score'] > 100) row['score'] = 100;
        new_sample.push(row);
    }
    return new_sample;
}

// Actual plugin code
// speeds (milliseconds)
var animation_speed = 500;
var flash_speed = 200;
var refresh_speed = 500;
var test_data = false;
var data_url = '/players.json';
var ref_url = '/scores.json';
var board = $('#masterboard');


function FillBoard( data ) {
    board.html('');
    data.sort(function(a,b){return b['score'] - a['score']});
    for (i in data) {
        var row_data = data[i],
            row_html = $('<div class="player_row">').attr('row_number', i).attr('player_id', row_data['id']),
            img = $('<img>').attr('src', row_data['img']),
            rank = $('<span class="player_rank">').text('#'+(parseInt(i)+1)),
            name = $('<span class="player_name">').text(row_data['name']),
            score = $('<span class="player_score">').text(row_data['score']);
        row_html.append(img, rank, name, score)
        board.append(row_html);
    }
    board.children('.player_row').each(function(){
        $(this).css({'top': $(this).position().top});
    }).css('position', 'absolute');
}
function FlashScore( score, span ) {
    span.fadeOut({
        duration: flash_speed/2,
        queue: false,
        complete: function(){
            span.text(score);
            span.fadeIn(flash_speed/2);
        }
    });
}
function AdjustRows( data ) {
    data.sort(function(a,b){return b['score'] - a['score']});
    for (i in data) {
        player_id = data[i]['id'];
        row = board.children('.player_row[player_id='+player_id+']');
        row.attr('row_number', i);
        row.children('.player_rank').text('#'+(parseInt(i)+1));
        row.attr('new_score', data[i]['score']);
    }
    board.children('.player_row').each(function(){
        var row = $(this),
            row_number = parseInt($(this).attr('row_number'));
        row.animate({'top': row_number * 50}, animation_speed);
        FlashScore(row.attr('new_score'), row.children('.player_score'));
    });
}

$.fn.masterboard = function( command ) {
    if (typeof command === 'object') {
        data = command['data'];
        FillBoard(data);
        function timer() {
            if (test_data) {
                AdjustRows(ModSample(data));
                setTimeout(timer, refresh_speed);
            }
            else {
                $.ajax({
                    url: ref_url,
                    success: function(data){
                        AdjustRows(data);
                        setTimeout(timer, refresh_speed);
                    }
                });
            }
        };
        timer();
    }
};

$(document).on('ready', function() {
    $('#masterboard').each(function() {
        if (test_data) $(this).masterboard({'data': sample});
        else {
            $.ajax({
                url: data_url,
                success: function( data ){
                    $(this).masterboard({'data': data});
                }
            });
        }
    });
});
