// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){


	// Display some statistic about this computer, using node's os module.

	var os = require('os');
	var prettyBytes = require('pretty-bytes');

	
	
	
	var printer = require("printer"),
    util = require('util');
	
	
	//$('.stats').append("installed printers:\n");

	$('.stats').append("installed printers:\n"+util.inspect(printer.getPrinters(), {colors:true, depth:10}));
	printer.printDirect({data:"<h1>print from Node.JS buffer</h1>" // or simple String: "some text"
	, printer:'NPI0E59B7 (HP LaserJet CM1415fn)' // printer name, if missing then will print to default printer
	, type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
	, success:function(jobID){
		console.log("sent to printer with ID: "+jobID);
	}
	, error:function(err){console.log(err);}
});
	//printDirect(stringData|bufferData, 'NPI0E59B7 (HP LaserJet CM1415fn)', format, docname, success, error)
	
	$('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
	$('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

	// Node webkit's native UI library. We will need it for later
	var gui = require('nw.gui');


	// Fetch the recent posts on Tutorialzine

	var ul = $('.flipster ul');

	// The same-origin security policy doesn't apply to node-webkit, so we can
	// send ajax request to other sites. Let's fetch Tutorialzine's rss feed:

	$.get('http://feeds.feedburner.com/Tutorialzine', function(response){

		var rss = $(response);

		// Find all articles in the RSS feed:

		rss.find('item').each(function(){
			var item = $(this);
			
			var content = item.find('encoded').html().split('</a></div>')[0]+'</a></div>';
			var urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;

			// Fetch the first image of the article
			var imageSource = content.match(urlRegex)[1];


			// Create a li item for every article, and append it to the unordered list

			var li = $('<li><img /><a target="_blank"></a></li>');

			li.find('a')
				.attr('href', item.find('link').text())
				.text(item.find("title").text());

			li.find('img').attr('src', imageSource);

			li.appendTo(ul);

		});

		// Initialize the flipster plugin

		$('.flipster').flipster({
			style: 'carousel'
		});

		// When an article is clicked, open the page in the system default browser.
		// Otherwise it would open it in the node-webkit window which is not what we want.

		$('.flipster').on('click', 'a', function (e) {

			e.preventDefault();
			
			// Open URL with default browser.
			gui.Shell.openExternal(e.target.href);

		});

	});

});