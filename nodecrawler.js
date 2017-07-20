let Crawler = require("crawler");

let urls = [];
let valids = [];

let c1 = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            let $ = res.$;
            let links = $('a');
            links.each((link) => {
              urls.push(links[link].attribs.href);
            });
        }
        done();
    }
});


let c2 = new Crawler({
    maxConnections : 100,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if(res.statusCode == '404'){
            //
        }else{
            console.log(res.request.uri.href);
            valids.push(res.request.uri.href);
        }
        done();
    }
});

c1.queue([`https://scottduane.github.io/TopSecretClue/`]);

c1.on('drain', () => {
  c2.queue(urls);

  c2.on('drain',function(){
    console.log(valids);
  });
});

