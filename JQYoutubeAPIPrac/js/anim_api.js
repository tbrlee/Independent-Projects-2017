//SearchBar Handler
$(function() {
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    //focus event handler
    searchField.on('focus', function() {
        $(this).animate({
            width: '100%',
        }, 400);        
        icon.animate({
            right: '10px'
        }, 400);
    });
    
    //blur event handler
    searchField.on('blur', function() {
        if(searchField.val() == '') {
            searchField.animate({
                width: '45%'
            },400, function() {});
            icon.animate({
                right: '360px'
            },400, function() {});
        }
    });
    
    $('#search-form').submit(function(e) {
        e.preventDefault();    
    });
})


function search() {
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input 
    q = $('#query').val();
    
    //run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyBzWo6ID2vMhbG4MQ9FKs7ncvFBtSUc6D4'
        }, function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            //log data
            console.log(data);
//            
            $.each(data.items, function(i, item) {
                //get output
                var output = getOutput(item);
                
                //display results
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            //display buttons
            $('#buttons').append(buttons);
        }
    );
}

//next page 
function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input 
    q = $('#query').val();
    
    //run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyBzWo6ID2vMhbG4MQ9FKs7ncvFBtSUc6D4'
        }, function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            //log data
            console.log(data);
//            
            $.each(data.items, function(i, item) {
                //get output
                var output = getOutput(item);
                
                //display results
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            //display buttons
            $('#buttons').append(buttons);
        }
    );
}

//prev button 
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input 
    q = $('#query').val();
    
    //run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyBzWo6ID2vMhbG4MQ9FKs7ncvFBtSUc6D4'
        }, function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            
            //log data
            console.log(data);
//            
            $.each(data.items, function(i, item) {
                //get output
                var output = getOutput(item);
                
                //display results
                $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            //display buttons
            $('#buttons').append(buttons);
        }
    );
}

//build output 
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    
    //build output string
    var output = '<li>' +
        '<div class="list-left">' + 
        '<img src="'+thumb+'">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'"'+ title + '</a></h3>' +
        '<small>By: <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' + 
        '<div class="clearfix"></div>' +
        '';
    
    return output;
}