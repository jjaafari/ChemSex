var request = require("request"),
	cheerio = require("cheerio"),
	async = require("async"),
	sequelize = require("sequelize"),
	clURLs = [ "http://atlanta.craigslist.org/search/m4m", "http://atlanta.craigslist.org/search/cas?sort=date&query=m4m", "http://atlanta.craigslist.org/search/cas?sort=date&query=m4mm", "http://atlanta.craigslist.org/search/cas?sort=date&query=mm4m", "http://atlanta.craigslist.org/search/cas?sort=date&query=m4t", "http://atlanta.craigslist.org/search/cas?sort=date&query=t4m", "http://atlanta.craigslist.org/search/m4m", "http://austin.craigslist.org/search/m4m", "http://austin.craigslist.org/search/cas?sort=date&query=m4m", "http://austin.craigslist.org/search/cas?sort=date&query=m4mm", "http://austin.craigslist.org/search/cas?sort=date&query=mm4m", "http://austin.craigslist.org/search/cas?sort=date&query=m4t", " http://austin.craigslist.org/search/cas?sort=date&query=t4m", "http://austin.craigslist.org/search/m4m", "http://boston.craigslist.org/search/m4m", "http://boston.craigslist.org/search/cas?sort=date&query=m4m", "http://boston.craigslist.org/search/cas?sort=date&query=m4mm", "http://boston.craigslist.org/search/cas?sort=date&query=mm4m", "http://boston.craigslist.org/search/cas?sort=date&query=m4t", " http://boston.craigslist.org/search/cas?sort=date&query=t4m", "http://boston.craigslist.org/search/m4m", "http://chicago.craigslist.org/search/m4m", "http://chicago.craigslist.org/search/cas?sort=date&query=m4m", "http://chicago.craigslist.org/search/cas?sort=date&query=m4mm", "http://chicago.craigslist.org/search/cas?sort=date&query=mm4m", "http://chicago.craigslist.org/search/cas?sort=date&query=m4t", " http://chicago.craigslist.org/search/cas?sort=date&query=t4m", "http://chicago.craigslist.org/search/m4m", "http://dallas.craigslist.org/search/m4m", "http://dallas.craigslist.org/search/cas?sort=date&query=m4m", "http://dallas.craigslist.org/search/cas?sort=date&query=m4mm", "http://dallas.craigslist.org/search/cas?sort=date&query=mm4m", "http://dallas.craigslist.org/search/cas?sort=date&query=m4t", "http://dallas.craigslist.org/search/cas?sort=date&query=t4m", "http://dallas.craigslist.org/search/m4m", "http://denver.craigslist.org/search/m4m", "http://denver.craigslist.org/search/cas?sort=date&query=m4m", "http://denver.craigslist.org/search/cas?sort=date&query=m4mm", "http://denver.craigslist.org/search/cas?sort=date&query=mm4m", "http://denver.craigslist.org/search/cas?sort=date&query=m4t", " http://denver.craigslist.org/search/cas?sort=date&query=t4m", "http://denver.craigslist.org/search/m4m", "http://detroit.craigslist.org/search/m4m", "http://detroit.craigslist.org/search/cas?sort=date&query=m4m", "http://detroit.craigslist.org/search/cas?sort=date&query=m4mm", "http://detroit.craigslist.org/search/cas?sort=date&query=mm4m", "http://detroit.craigslist.org/search/cas?sort=date&query=m4t", " http://detroit.craigslist.org/search/cas?sort=date&query=t4m", "http://detroit.craigslist.org/search/m4m", "http://houston.craigslist.org/search/m4m", "http://houston.craigslist.org/search/cas?sort=date&query=m4m", "http://houston.craigslist.org/search/cas?sort=date&query=m4mm", "http://houston.craigslist.org/search/cas?sort=date&query=mm4m", "http://houston.craigslist.org/search/cas?sort=date&query=m4t", " http://houston.craigslist.org/search/cas?sort=date&query=t4m", "http://houston.craigslist.org/search/m4m", "http://lasvegas.craigslist.org/search/m4m", "http://lasvegas.craigslist.org/search/cas?sort=date&query=m4m", "http://lasvegas.craigslist.org/search/cas?sort=date&query=m4mm", "http://lasvegas.craigslist.org/search/cas?sort=date&query=mm4m", "http://lasvegas.craigslist.org/search/cas?sort=date&query=m4t", " http://lasvegas.craigslist.org/search/cas?sort=date&query=t4m", "http://lasvegas.craigslist.org/search/m4m", "http://losangeles.craigslist.org/search/m4m", "http://losangeles.craigslist.org/search/cas?sort=date&query=m4m", "http://losangeles.craigslist.org/search/cas?sort=date&query=m4mm", "http://losangeles.craigslist.org/search/cas?sort=date&query=mm4m", "http://losangeles.craigslist.org/search/cas?sort=date&query=m4t", " http://losangeles.craigslist.org/search/cas?sort=date&query=t4m", "http://losangeles.craigslist.org/search m4m", "http://miami.craigslist.org/search/m4m", "http://miami.craigslist.org/search/cas?sort=date&query=m4m", "http://miami.craigslist.org/search/cas?sort=date&query=m4mm", "http://miami.craigslist.org/search/cas?sort=date&query=mm4m", "http://miami.craigslist.org/search/cas?sort=date&query=m4t", " http://miami.craigslist.org/search/cas?sort=date&query=t4m", "http://miami.craigslist.org/search/m4m", "http://minneapolis.craigslist.org/search/m4m", "http://minneapolis.craigslist.org/search/cas?sort=date&query=m4m", "http://minneapolis.craigslist.org/search/cas?sort=date&query=m4mm", "http://minneapolis.craigslist.org/search/cas?sort=date&query=mm4m", "http://minneapolis.craigslist.org/search/cas?sort=date&query=m4t", " http://minneapolis.craigslist.org/search/cas?sort=date&query=t4m", "http://minneapolis.craigslist.org/search/m4m", "http://newyork.craigslist.org/search/m4m", "http://newyork.craigslist.org/search/cas?sort=date&query=m4m", "http://newyork.craigslist.org/search/cas?sort=date&query=m4mm", "http://newyork.craigslist.org/search/cas?sort=date&query=mm4m", "http://newyork.craigslist.org/search/cas?sort=date&query=m4t", " http://newyork.craigslist.org/search/cas?sort=date&query=t4m", "http://newyork.craigslist.org/search/m4m", " http://orangecounty.craigslist.org/search/m4m", "http://orangecounty.craigslist.org/search/cas?sort=date&query=m4m", "http://orangecounty.craigslist.org/search/cas?sort=date&query=m4mm", "http://orangecounty.craigslist.org/search/cas?sort=date&query=mm4m", "http://orangecounty.craigslist.org/search/cas?sort=date&query=m4t", " http://orangecounty.craigslist.org/search/cas?sort=date&query=t4m", "http://orangecounty.craigslist.org/search/m4m", " http://philadelphia.craigslist.org/search/m4m", "http://philadelphia.craigslist.org/search/cas?sort=date&query=m4m", "http://philadelphia.craigslist.org/search/cas?sort=date&query=m4mm", "http://philadelphia.craigslist.org/search/cas?sort=date&query=mm4m", "http://philadelphia.craigslist.org/search/cas?sort=date&query=m4t", "http://philadelphia.craigslist.org/search/cas?sort=date&query=t4m", "http://philadelphia.craigslist.org/search/m4m", " http://phoenix.craigslist.org/search/m4m", "http://phoenix.craigslist.org/search/cas?sort=date&query=m4m", "http://phoenix.craigslist.org/search/cas?sort=date&query=m4mm", "http://phoenix.craigslist.org/search/cas?sort=date&query=mm4m", "http://phoenix.craigslist.org/search/cas?sort=date&query=m4t", " http://phoenix.craigslist.org/search/cas?sort=date&query=t4m", "http://phoenix.craigslist.org/search/m4m", " http://portland.craigslist.org/search/m4m", "http://portland.craigslist.org/search/cas?sort=date&query=m4m", "http://portland.craigslist.org/search/cas?sort=date&query=m4mm", "http://portland.craigslist.org/search/cas?sort=date&query=mm4m", "http://portland.craigslist.org/search/cas?sort=date&query=m4t", " http://portland.craigslist.org/search/cas?sort=date&query=t4m", "http://portland.craigslist.org/search/m4m", " http://raleigh.craigslist.org/search/m4m", "http://raleigh.craigslist.org/search/cas?sort=date&query=m4m", "http://raleigh.craigslist.org/search/cas?sort=date&query=m4mm", "http://raleigh.craigslist.org/search/cas?sort=date&query=mm4m", "http://raleigh.craigslist.org/search/cas?sort=date&query=m4t", " http://raleigh.craigslist.org/search/cas?sort=date&query=t4m", "http://raleigh.craigslist.org/search/m4m", "http://sacramento.craigslist.org/search/m4m", "http://sacramento.craigslist.org/search/cas?sort=date&query=m4m", "http://sacramento.craigslist.org/search/cas?sort=date&query=m4mm", "http://sacramento.craigslist.org/search/cas?sort=date&query=mm4m", "http://sacramento.craigslist.org/search/cas?sort=date&query=m4t", " http://sacramento.craigslist.org/search/cas?sort=date&query=t4m", "http://sacramento.craigslist.org/search/m4m", "http://sandiego.craigslist.org/search/m4m", "http://sandiego.craigslist.org/search/cas?sort=date&query=m4m", "http://sandiego.craigslist.org/search/cas?sort=date&query=m4mm", "http://sandiego.craigslist.org/search/cas?sort=date&query=mm4m", "http://sandiego.craigslist.org/search/cas?sort=date&query=m4t", " http://sandiego.craigslist.org/search/cas?sort=date&query=t4m", "http://sandiego.craigslist.org/search/m4m", "http://seattle.craigslist.org/search/m4m", "http://seattle.craigslist.org/search/cas?sort=date&query=m4m", "http://seattle.craigslist.org/search/cas?sort=date&query=m4mm", "http://seattle.craigslist.org/search/cas?sort=date&query=mm4m", "http://seattle.craigslist.org/search/cas?sort=date&query=m4t", " http://seattle.craigslist.org/search/cas?sort=date&query=t4m", "http://seattle.craigslist.org/search/m4m", "http://washingtondc.craigslist.org/search/m4m", "http://washingtondc.craigslist.org/search/cas?sort=date&query=m4m", "http://washingtondc.craigslist.org/search/cas?sort=date&query=m4mm", "http://washingtondc.craigslist.org/search/cas?sort=date&query=mm4m", "http://washingtondc.craigslist.org/search/cas?sort=date&query=m4t", " http://washingtondc.craigslist.org/search/cas?sort=date&query=t4m", "http://washingtondc.craigslist.org/search/m4m", "http://sfbay.craigslist.org/search/m4m", "http://sfbay.craigslist.org/search/cas?sort=date&query=m4m", "http://sfbay.craigslist.org/search/cas?sort=date&query=m4mm", "http://sfbay.craigslist.org/search/cas?sort=date&query=mm4m", "http://sfbay.craigslist.org/search/cas?sort=date&query=m4t", "http://sfbay.craigslist.org/search/cas?sort=date&query=t4m", "http://sfbay.craigslist.org/search/m4m" ]

db = new sequelize("cunyj_scrape", "root", "root", {
    	host:"127.0.0.1",
    	port:3305,
    	dialectOptions:{
                  socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
    	},
    	logging: true}),
wiki = db.import(__dirname + "/scraper_sample_cList");


var posts = [],
	urlPosts,
	postCount;

function getPosts(url, cb){
	var callURL = url + '?s=' + urlPosts.length;
	request(callURL, function(err, response, body){
		var $ = cheerio.load(body),
			urlPrefix = callURL.match(/(https?:\/\/[^\/]+)/)[1];

		postCount = parseInt($(".totalcount").text());

		$("p.row").find("a").each(function(){
			var a = $(this);
			urlPosts.push(urlPrefix + a.attr("href"));
		});

		if(posts.length < postCount){
			getPosts(url, cb);
		} else{
			cb();
		}
	});
}

function getCities(cb){
	async.eachSeries(clURLs, function(url, nextURL){
		urlPosts = [];
		getPosts(url, function(){
			Array.prototype.push.apply(posts, urlPosts);
			nextURL();
		})
	}, function(err){
		cb();
	})
}

getCities(function(){
	console.log(typeof posts);
	console.log(posts.length, "posts");
	async.eachSeries(posts, function(post, nextPost){
		var url = post;

		request(url, function(err, response, body){
			if(!err){
				var $ = cheerio.load(body),
					manwhore = {
						age: "N/A",
						location: $(".postingtitletext").find("small").text().replace(/[^A-Za-z0-9\/\s]+/g, "").trim(),
						top: "N/A",
						bottom: "N/A",
						party: "N/A",
						timestamp: $(".timeago").attr("datetime"),
						url: url
					};

				$("#postingbody, .postingtitletext").each(function(){
					var p = $(this).text();
					if(p.search(/top/gi) > -1){
						manwhore.top = p;
					};

					if(p.search(/bottom/gi) > -1){
						manwhore.bottom = p;
					}

					if(p.search(/.*(?:party|pnp|p\s*[&]\s*p).*/gi) > -1){
						manwhore.party = p;
					}
				});

				$(".mapAndAttrs").find('.attrgroup').each(function(){
					var group = $(this);
						text = group.text(),
						ageTest = text.match(/age\:\s*([0-9]+)/);
						
					if(ageTest){
						manwhore.age = ageTest[1];
					}

				});
				
				console.log(manwhore);

				wiki.findOrCreate({where:{
					url: manwhore.url
				}, defaults: manwhore});
			} else{
				console.log(err);
			}

			nextPost();
		});
	}, function(err){
		console.log("done!");
	});
});

