import { Link } from "react-router-dom"

import { Logo } from "../index"

function Footer() {
    return (
        <footer className="w-full py-4 bg-header">
            <div className="z-10 mx-2 md:mx-auto max-w-7xl">
                <div className=" flex flex-wrap justify-between ">
                    <div className="w-full md:p-3 md:w-1/3 lg:w-5/12">
                        <div className="flex h-full items-center flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="180px" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/3 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-5 text-xs font-bold uppercase text-gray-500">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="font-xs md:text-base md:font-medium text-gray-200 hover:text-gray-700"
                                        to="https://github.com/Shreyash2112/Thought-Cove"
                                        target="_blank"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="font-xs md:text-base md:font-medium text-wrap text-gray-200 hover:text-gray-700"
                                        to="https://github.com/Shreyash2112/Thought-Cove"
                                        target="_blank"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-2 sm:max-w-1/3 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-5 text-xs font-bold uppercase text-gray-500">
                                Follow Us
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="font-xs md:text-base md:font-medium text-gray-200 hover:text-gray-700"
                                        to="https://github.com/Shreyash2112/Thought-Cove"
                                        target="_blank"
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" font-xs md:text-base md:font-medium text-gray-200 hover:text-gray-700"
                                        to="https://www.linkedin.com/in/shreyash-purankar"
                                        target="_blank"
                                    >
                                        Linkedin
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-2 md:w-1/3 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-5 text-xs font-bold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="font-xs md:text-base text-wrap md:font-medium text-gray-200 hover:text-gray-700"
                                        to="https://github.com/Shreyash2112/Thought-Cove"
                                        target="_blank"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="font-xs md:text-base text-wrap md:font-medium text-gray-200 hover:text-gray-700"
                                        to="https://github.com/Shreyash2112/Thought-Cove"
                                        target="_blank"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
                <div>
                    <p className="text-sm text-gray-600">
                        &copy; 2025 ThoughtCove<sup>TM</sup>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer