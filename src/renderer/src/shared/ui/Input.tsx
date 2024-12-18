


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}


export function Input ({
...props
}: InputProps) {
  return (
    <>
      <input
        className="w-full h-10 px-4 py-2 text-base text-neutral-50 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700"
        {...props}
      />
    </>
  )
}
