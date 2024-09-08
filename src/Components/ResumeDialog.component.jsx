import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogFooter } from '../Components/ui/dialog'
import { Button } from '../Components/ui/button'


export function ResumeDialog({ open, resume, setOpen }) {
    return (
        <div>
            <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
                <DialogContent onInteractOutside={() => setOpen(false)}>
                    <figure className='h-[70vh]'>
                        <img className='h-full w-full object-contain' src={resume} alt="resume" />
                    </figure>
                    <DialogFooter>
                        <Button className="my-4" onClick={() => setOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

ResumeDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    resume: PropTypes.string.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default ResumeDialog