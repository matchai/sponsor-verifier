import GitHub from "../svgs/github.svg";

export default function Heading() {
  return (
    <div className="text-center">
      <div className="mb-6">
        <img
          className="w-32 m-auto mb-2 rounded-full"
          width="128"
          height="128"
          src="https://github.com/matchai.png"
          alt="Matan Kushner (matchai)"
        />

        <span className="block font-semibold text-xl text-gray-900">
          Matan Kushner
        </span>
        <a
          href="http://github.com/matchai"
          className="inline-flex items-center text-lg text-gray-700"
        >
          <GitHub className="w-4 h-4 mr-1 fill-current" />
          matchai
        </a>
      </div>

      <h1 className="text-3xl md:text-4xl">Thank you for sponsoring me!</h1>
      <p className="text-lg mt-6 mb-12 text-gray-600">
        I am incredibly grateful for your support and would like to send you the
        occasional sticker pack for the projects I'm working on 💌
      </p>
    </div>
  );
}
