"use client"

export default function Question1(props) {
    console.log(props);
    return (
        <div>
            <button className=" shadow-xl outline outline-offset-0 outline-1 hover:bg-blue-500 text-black font-semibold hover:text-white border-solid border-stone-50 py-2 px-4 hover:border-transparent text-6xl " onClick={() => alert("Question Id is: ")}>{props.question_id}</button>
        </div>
    )

}