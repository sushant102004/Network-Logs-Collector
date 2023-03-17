import * as React from "react";
import { useState } from "react";

export default function SearchPage() {
    const [site, setSite] = useState('')
    const [pages, setPages] = useState('')

    return (
        <>
            <div className = 'text-center mt-14'>
                <p className = 'text-slate-800 text-2xl '>Website</p>
                <p className = 'mt-4 text-slate-700'>Enter a website URL in below input field. Make sure to only enter domain name. <br/>Do not enter any subdomain or protocol.</p>
                <input
                className="focus:outline-0 bg-slate-50 border-2 rounded-md w-80 p-2 mt-6"
                placeholder="lambdatest.com"
                value={site}
                onChange={(event) => setSite(event.target.value)}
                ></input>



                {/* Pages To Scan */}
                <p className = 'text-slate-800 text-2xl mt-16'>Pages</p>
                <p className = 'mt-4 text-slate-700'>Enter link text from above website if you want to scan those pages also. Make sure to only enter link text do not enter link itself. <br/>Example: "Start Scan" is a link text which will go to another page on click.</p>
                <textarea
                className="focus:outline-0 bg-slate-50 border-2 rounded-md w-96 h-36 p-2 mt-6"
                placeholder = 'Enterprise&#10;Pricing&#10;Platform'
                value={pages}
                onChange={(event) => setPages(event.target.value)}
                ></textarea>

                <div className="flex w-24 h-8 bg-yellow-400 rounded-md justify-center items-center text-sm text-slate-800 ml-auto mr-auto mt-6">
                <a href="/" className="bg-transparent">Start Scan</a>
            </div>
            </div>
        </>
    )
}