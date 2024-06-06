import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface MeetingModalType{
  isOpen: boolean,
  onClose: ()=>void;
  title: string,
  buttonText: string,
  className?: string,
  handleClick?: ()=>void,
  children?: React.ReactNode
}

const MeetingModal = ({isOpen, onClose, title, buttonText, className, handleClick, children}: MeetingModalType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-dark-2 border-none text-white px-6 py-9 flex gap-5 flex-col'>
        <DialogHeader>
          <DialogTitle className={cn('text-2xl font-normal', className)}>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <Button className='bg-blue-1 hover:bg-blue-600 hover:bg-opacity-60' onClick={handleClick}>{buttonText}</Button>
      </DialogContent>
    </Dialog>

  )
}

export default MeetingModal