import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

type ButtonProps = {
  isWebLink?: false;
  isAppLink?: false;
  isAppNavLink?: false;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type WebLinkProps = {
  isWebLink: true;
  isAppLink?: false;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type AppLinkProps = {
  isWebLink?: false;
  isAppLink: true;
} & LinkProps;

type Props = ButtonProps | WebLinkProps | AppLinkProps;
export const Button = ({
  isWebLink,
  isAppLink,
  className,
  ...props
}: Props) => {
  const buttonProps = props as ButtonProps;
  const webLinkProps = props as WebLinkProps;
  const appLinkProps = props as AppLinkProps;

  const classNames = clsx(
    'inline-block border border-blue-400 py-2 px-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-400 hover:border-blue-400 transition-all',
    className,
  );

  if (isWebLink) {
    return <a {...webLinkProps} className={classNames} />;
  }
  if (isAppLink) {
    return <Link {...appLinkProps} className={classNames} />;
  }
  return <button {...buttonProps} className={classNames} />;
};
