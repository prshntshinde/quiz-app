"use client"

export default function RulesModal(props) {
    console.log(props);
    return (
        <div>
            <button className="outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent text-xl " onClick={() => alert("Question Id is: ")}>Rules</button>
        </div>
    )

}

