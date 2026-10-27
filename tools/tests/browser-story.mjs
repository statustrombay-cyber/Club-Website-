/** Approach the lazy chapter as a visitor would, then return to the caller's
 * position. Do not require a GPU scene to run over the hero or splash. */
export async function warmStory(page){
 await page.waitForFunction(()=>!document.documentElement.classList.contains('intro-cover'),null,{timeout:15000});
 const y=await page.evaluate(()=>scrollY);
 await page.locator('.story-track').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-innerHeight-500,behavior:'instant'}));
 await page.waitForFunction(()=>document.querySelector('.mind-story')?.dataset.storyState==='ready',null,{timeout:70000});
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
}
