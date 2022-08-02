import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import ButtonCommon from 'components/Button'
import ButtonFullBg from 'components/Button/ButtonFullBg'
import ButtonLarge from 'components/Button/ButtonLarge'
import InputFieldSelect from 'components/CustomField/InputFieldSelect'
import { InputCommon } from 'components/Input'
import Modal from 'components/Modal'
import TableCustom from 'components/Table'
import React, { useState } from 'react'

const AdminScreen = () => {

    const [open, setIsOpen] = useState(false)

    const [typeQuestion, setTypeQuestion] = useState([
        { label: 'Multiple Choice', value: 1 },
        { label: 'Fill in the gap', value: 2 },
        { label: 'Odd one out', value: 3 },
        { label: 'Put words in order', value: 4 },
    ])

    return (
        <div>
            <ButtonCommon styleButton={{ background: 'blue', color: 'white' }} children={'Create Question'} onClick={() => setIsOpen(true)} />

            {open &&
                <Modal open={open} onClose={() => setIsOpen(false)} children={
                    <div>
                        <InputFieldSelect option={typeQuestion} label="Type Of Question" />
                        <div style={{ width: '100%' }}>
                            <InputCommon id="outlined-basic" label="Question" variant="standard" style={{ width: '50%%' }} />
                        </div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { width: '25ch', marginRight: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <InputCommon id="standard-basic" label="Answer 1" variant="standard" />
                            <InputCommon id="standard-basic" label="Answer 2" variant="standard" />
                            <InputCommon id="standard-basic" label="Answer 3" variant="standard" />
                            <InputCommon id="standard-basic" label="Answer 4" variant="standard" />
                        </Box>
                    </div>
                } />
            }
        </div>
    )
}
export default AdminScreen