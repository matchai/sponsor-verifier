export default function Heading() {
  return (
    <div className="text-center">
      <a href="http://github.com/matchai">
        <img
          className="w-32 m-auto mb-4 inline rounded-full"
          width="128"
          height="128"
          src="https://github.com/matchai.png"
          alt="Matan Kushner (matchai)"
        />
      </a>
      <h1 className="text-3xl md:text-4xl">Thank you for sponsoring me!</h1>
      <p className="text-lg mt-6 mb-12 text-gray-600">
        I am incredibly greatful for your support and would like to send you the
        occasional sticker pack for the projects I'm working on 💌
      </p>
    </div>
  );
}
