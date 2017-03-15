# ChemSex
A web scraper using node and JS to scrape the U.S.'s craigslist personals for gay men searching for sex and drugs. 
<hr>
<h2> The idea </h2>
<p> Despite the rise in mobile sex apps, Craigslist still remains a popular site for many gay men to find sex. There has also been a rise in news reports from VICE to Fusion that talk about ChemSex, a jargon for having sex while high. Though this is nothing new. For those in the gay male community, having sex with drugs is commonplace, if not normalized through sex parties found in high profile bars and clubs. Nonetheless, there is an interest in ChemSex now and since Craigslist provides a trove of data -- including post time, age, height, weight, preferred sexual role and photos -- it seemed to be the best palce to find if people are, indeed, posting more to have sex while high. </p>
<hr>
<h2> The process </h2>
<p>The scraper was created using JS language and executed through node. 

There were three problems I needed to solve: language and slang, scope and, what I like to call,"thirsty posters."  </p>

<h3> Language </h3>
<p>Problematic was trying to actually narrow down how we would find people who were posting for sex and drugs. The popular term "party and play" can be said in multiple ways: PnP, Par-t-n-play, PandP, etc. In order to solve this, we had to use a number of RegEx expressions to filter out the posts that would specifically have any of that language involved. 

<h3> Scope </h3>
<p> The second problem was trying to actually figure out how large this scraper would be. Is it representative to say that people in Alabama are posting for sex with drugs at a higher rate than Montana, despite population sizes varying? So I decided to limit the posts to metropolitan cities within each state. That, in most cases, meant city capitols and the first two largest cities in the state. 

<h3> Thirsty Posters </h3>
<p> If you can imagine, for a second, being high and horny. One post searching for sex might not do it. You might post twice, three times, even -- in one case I found -- fifteen times in a night. To solve this, we had to find similar language in posts and run a JS formula that would delete doubles. 
