import * as React from "react";
import { useState } from "react";

export default function SearchPage() {
    const [site, setSite] = useState('')
    const [pages, setPages] = useState('')

    return (
        <>
            <div className = 'text-center mt-20'>
                <p className = 'text-slate-800 text-2xl '>Website</p>
                <p className = 'mt-4 text-slate-700'>Enter a website URL in below input field. Make sure to only enter domain name. <br/>Do not enter any subdomain or protocol.</p>
                <input
                className="focus:outline-0 bg-slate-50 border-2 rounded-md w-80 p-2 mt-6"
                placeholder="lambdatest.com"
                value={site}
                onChange={(event) => setSite(event.target.value)}
                ></input>
            </div>
        </>
    )
}