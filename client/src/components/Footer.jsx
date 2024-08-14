import React from "react";

function Footer() {
    return(
        <>
            <footer className="bg-[#2E2E2E] text-[#D3D3D3] w-full py-5 text-center">
                <div className="max-w-screen-xl mx-auto">
                    <p className="my-2">
                        <a href="https://github.com/Cheemx" target="_blank" className="text-[#00CFFF] no-underline mx-4 hover:text-[#00FFFF]">GitHub</a>
                        <a href="https://leetcode.com/myself_cm_" target="_blank" className="text-[#00CFFF] no-underline mx-4 hover:text-[#00FFFF]">LeetCode</a>
                    </p>
                    <p className="my-2 text-[#FFFFFF]">
                        &copy; 2024 ReportRelay. All rights reserved. <br />
                        Trademarks and brands are the property of their respective owners.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer