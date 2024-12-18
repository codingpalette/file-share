import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib";
import { cva, VariantProps } from 'class-variance-authority';




/**
VariantProps: class-variance-authority 라이브러리에서 제공하는 클래스 변이 관련 기능을 사용하기 위한 타입입니다.
이 타입은 cva 함수를 사용할 때 클래스의 변이를 지정하기 위해 필요한 속성들을 정의하고 있습니다.

ButtonHTMLAttributes: HTML 버튼 엘리먼트에 적용되는 속성들을 정의한 타입입니다.
이는 React에서 HTML 요소의 속성을 타입으로 지정해 놓은 것으로,
버튼 컴포넌트에 HTML 버튼 엘리먼트의 속성들을 적용하기 위해 사용됩니다.

FC: React에서 함수형 컴포넌트를 정의할 때 사용하는 타입으로,
FC는 "Functional Component"의 약자입니다.
이를 사용하면 React 함수형 컴포넌트를 정의할 때 props의 타입이나 기타 컴포넌트 속성들을 명시적으로 지정할 수 있습니다.
*/

export const ButtonVariants = cva(
  `
    rounded
  `,
  {
    //variant , size에 따라 다른 디자인을 보여줄수 있다
    variants: {
      intent: {
        default: 'bg-neutral-50 text-black',
        primary: 'bg-zinc-800 text-neutral-50',
        outline: 'bg-transparent border border-zinc-700 text-neutral-50',
      },
      size: {
        smail: 'text-xs px-[7px]',
        middle: 'text-sm px-[15px] py-[4px]',
        large: 'text-md px-[15px] py-[7px]',
        icon: 'w-[38px] h-[38px] flex items-center justify-center'
      },
    },
    defaultVariants: {
      size: 'middle',
      intent: 'default',
    },
  },
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants>  {
  children?: React.ReactNode; // 버튼 내부에 들어갈 내용
  additionalClass?: string; // 추가 클래스
}


export function Button({
  children,
  size,
  intent,
  additionalClass,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        className={cn('  ', ButtonVariants({ size, intent }), additionalClass)}
        {...props}
      >{children}</button>
    </>
  )
}
