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

const rules = require('./rules');

console.log(typeof rules)


// request('https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/at-rule-empty-line-before/README.md', function (error, response, body) {

//   let intoHTML = converter.makeHtml(body);
//   dataRender(intoHTML)
// });

let fi = {
    uri: 'https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/at-rule-empty-line-before/README.md'
}
let urls = rules.map((item, i) => {
    return `https://raw.githubusercontent.com/stylelint/stylelint/master/lib/rules/${item}/README.md`
})

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


        // TODO  condition to item wich have one rule
        let result = htmlString.map((item, i) => {
          let intoHTML = converter.makeHtml(item);
          const $ = cheerio.load(intoHTML);
          let option = $('#options').next('p').find('code').last().text();
          let name = $('h1');
          let sorrow = '';
          let countRuleOne = 0;
          let countRuleTwo = 0;
          
                if(option.indexOf('|') !== -1) {
                    option = option.split('|');
                    
                    for(let j = 0;option.length > j; j+=1 ) {
                        if(option[j].indexOf('[') === -1 ) {
                           
                            if(option[j].indexOf('/regex/') === -1) {
                            let trim = option[j].slice(1, option[j].length - 1)
                            let neop = '#' + trim;
                       
                            sorrow += $(neop) + $(neop).nextUntil('h3').find('code')
                            // console.log(' ' + $(neop).nextUntil('h3').find('code'))

                        } else {
                                countRuleOne += 1
                            }

                        } else {
                            let trim = option[j].slice(1, option[j].length - 1)
                            let neop = '#' + trim;
        
                             sorrow += `<h3 id=${neop[0] + j}>${option[j]}</h3>`
                            //array ar not prepare yet 
                            // console.log(option[j], '2')
                            countRuleTwo += 1
                        }
                        
                    } 
                }
                // console.log(countRuleOne, countRuleTwo)
               let endpoint = name + sorrow;
                
                
                return endpoint;
        })
 

        let resultJs =htmlString.map((item, i) => {
          let intoHTML = converter.makeHtml(item);
          const $ = cheerio.load(intoHTML);
          let option = $('#options').next('p').find('code').last().text();
          let name = $('h1').text();
          let sorrow = '';
          let countRuleOne = 0;
          let countRuleTwo = 0;
          let sub = '';
          let rules = []
          
                if(option.indexOf('|') !== -1) {

                    option = option.split('|');
                    // console.log(option)
                    sub = option
                    for(let j = 0;option.length > j; j+=1 ) {
                        if(option[j].indexOf('[') === -1 ) {
                           
                            if(option[j].indexOf('/regex/') === -1) {
                            let trim = option[j].slice(1, option[j].length - 1)
                            let neop = '#' + trim;
                            
                            sorrow += $(neop).nextUntil('h3').find('code')
                            rules.push({
                                title: neop,
                                code: $(neop).nextUntil('h3').find('code').text()
                            })
                            // console.log(neop + ' TITLE ' + j)
                            // console.log($(neop).nextUntil('h3').find('code').text())
                            // console.log(' ' + $(neop).nextUntil('h3').find('code'))

                        } else {
                                countRuleOne += 1
                            }

                        } else {
                            let trim = option[j].slice(1, option[j].length - 1)
                            let neop = '#' + trim;
        
                             sorrow += `<h3 id=${neop[0] + j}>${option[j]}</h3>`
                            //array ar not prepare yet 
                            // console.log(option[j], '2')
                            countRuleTwo += 1
                        }
                        
                    } 
                }
                // console.log(countRuleOne, countRuleTwo)

               let endpoint =  {
                   name: '' + name,
                   sub: sub,
                   code: rules
               }
                //    console.log(endpoint)
                return endpoint;
        })

// console.log(resultJs)
// dataRenderJs(resultJs) 
        //  dataRender(result)

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

function dataRenderJs(data) {
    const page = JSON.stringify(data);

    fs.appendFile('message.json', page, (err) => {
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