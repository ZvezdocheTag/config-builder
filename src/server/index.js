const showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = '#hello, markdown!',
    html      = converter.makeHtml(text);

const http = require('http');
const https = require('https');

const hostname = '127.0.0.1'
const port = '3005'

const fs = require('fs');
const url = require('url');
const request = require('request');
const rp = require('request-promise');

const cheerio = require("cheerio");

let ds;


// request('https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/at-rule-empty-line-before/README.md', function (error, response, body) {

//   let intoHTML = converter.makeHtml(body);
//   dataRender(intoHTML)
// });

let fi = {
    uri: 'https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/at-rule-empty-line-before/README.md'
}
let urls = [
    'https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/at-rule-empty-line-before/README.md',
    'https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/at-rule-name-case/README.md'
]

// rp(fi)
//     .then(function (htmlString) {
//           let intoHTML = converter.makeHtml(htmlString);
//           dataRender(intoHTML)
//     })
//     .catch(function (err) {
//         // Crawling failed...
//         console.log(err)
//     });

Promise.all(urls.map(url => new Promise((resolve, reject)=>{
    request.get(url, (err, res, html)=>{
        if(err){
            return reject(err);
        }
       
        return resolve(html);
    });
}))).then(
function (htmlString) {


        let result = htmlString.map((item, i) => {
          let intoHTML = converter.makeHtml(item);
          const $ = cheerio.load(intoHTML);
          let option = $('#options').next('p').find('code').last().text();
          let container = $('body').append(`<div class="logger item-${i}"></div>`);
          let name = $('h1');
          let sorrow = '';

                if(option.indexOf('|') !== -1) {
                    option = option.split('|');
                    
                    for(let j = 0;option.length > j; j+=1 ) {
                      
                        let trim = option[j].slice(1, option[j].length - 1)
                        let neop = '#' + trim;
                        
                         sorrow += $(neop) + $(neop).nextUntil('h3').find('code')
                        //  dataRender($(neop).nextUntil('h3').find('code'))
                        // console.log(typeof $(neop).nextUntil('h3'))
                    }
                }
               let endpoint = name + sorrow;
                
                
                return endpoint;
        })

         dataRender(result)

    }

).catch((err) => {
    console.log(err)
});



function dataRender(data) {
    const page = 
`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        ${data}
    </body>
    </html>
    `

    fs.appendFile('message.html', page, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    

}


// process.stdout.write(ds);
// console.log(ds)
//Create file with our data



const server = http.createServer((req, res) => {
    res.statusCode  = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./message.html', null, (err, data) => {
        if(err) {
            res.writeHead(404);
            res.write('File no found')
        } else {
            res.write(data)
        }
        res.end()
    })
    // res.end('./index.html')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})