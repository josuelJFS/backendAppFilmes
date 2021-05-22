const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer');



router.get('/',(req,res)=>{
   
    const puppeteer = require('puppeteer');
    let descricao = '';
    
    (async () => {
      const browser = await puppeteer.launch({
        headless:false
      });
      var contabas = 5;
      browser.on('targetcreated', async function(e){
        var tabs = await browser.pages()
        
        if(contabas>4){
        
          try {
            await tabs[contabas].evaluate(() => window.close());
            contabas=6;
          } catch (error) {
            
          }
        }
      })
      const page = await browser.newPage();
      await page.goto('https://flix.sionsnetwork.com/filmes/');
    
      var dimensions = await page.evaluate(() => {
        const filmes = [];
        document.querySelectorAll('article').forEach(e=>{
          const header = e.querySelector('header');
          const linkpagevideo = e.querySelector('a').getAttribute('href');
          const imgLink = e.querySelector('figure').querySelector('img').getAttribute('data-src');
          const titulo = header.querySelector('h2').innerHTML;
          const ano = header.querySelector('span').innerHTML;
          console.log(titulo,imgLink);
          filmes.push({titulo:titulo,anoLancamento:ano,img:imgLink,linkFrame:linkpagevideo})
          
          // const linkframe = document.querySelector('iframe').getAttribute('src');
         
          
      })
    
      return filmes
      });
      
     
      const page2 = await browser.newPage();
      await page2.goto(dimensions[0].linkFrame,{ waitUntil: 'networkidle2'});
      
      
      const pag2info2 = await page2.evaluate(() => {
         var aa = document.querySelectorAll('article div')[2].querySelector('p').innerHTML;
         return {url:document.querySelector('iframe').getAttribute('src'),descricao:aa};
       })
      
    
      
       const page3 = await browser.newPage();
      await page3.goto(pag2info2.url);
      const pag2info3 = await page3.evaluate(() => {
        return document.querySelector('iframe').getAttribute('src');
      })
    
      
      const page4 = await browser.newPage();
      await page4.goto(pag2info3,{ waitUntil: 'networkidle2'});
    
    
    
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     await page4.click('button');
     
     
    
      const pag4info = await page4.evaluate(() => {
        var got = '';
        document.querySelectorAll('iframe').forEach(e=>{
          var src = e.getAttribute('src')
          try {
            if(src.indexOf('slixplayer.com') >= 0){
              got = src;
            }
          } catch (error) {
            
          }
        })
    
        return got;
      })
    
    
    
    await browser.close();
    res.send({...dimensions[0],urlVideoPlayer:pag4info,descricao:pag2info2.descricao});
    
    
    
    
      
    
    
    
    
     
    })();


     
})


module.exports = router;
