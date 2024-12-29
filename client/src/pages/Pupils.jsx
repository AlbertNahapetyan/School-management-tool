import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, Typography, Dialog, DialogActions, DialogContent, DialogTitle,
    Button, TextField, MenuItem, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPupilsQuery } from "../apollo/queries/pupils";
import { getSubjectsQuery } from "../apollo/queries/subjects";
import { deletePupilMutation, createPupilMutation, updatePupilMutation } from "../apollo/mutations/pupils";

const PupilsPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPupilId, setSelectedPupilId] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [pupilName, setPupilName] = useState('');
    const [pupilGrade, setPupilGrade] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const { loading, error, data: pupilsData, refetch } = useQuery(getPupilsQuery, {
        variables: { skip: page * rowsPerPage, take: rowsPerPage },
        context: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
    });

    const { data: subjectsData } = useQuery(getSubjectsQuery, {
        context: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
    });

    const [deletePupil] = useMutation(deletePupilMutation);
    const [createPupil] = useMutation(createPupilMutation);
    const [updatePupil] = useMutation(updatePupilMutation);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async () => {
        if (selectedPupilId) {
            await deletePupil({
                variables: { deletePupilId: selectedPupilId },
                context: {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            });

            setOpenModal(false);
            await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
        }
    };

    const handleCreatePupil = async () => {
        try {
            if(pupilName && pupilGrade && subjectId) {
                await createPupil({
                    variables: {
                        name: pupilName,
                        grade: pupilGrade,
                        subjectId: parseInt(subjectId, 10)
                    },
                    context: {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                });

                setOpenCreateDialog(false);
                setPupilName('');
                setPupilGrade('');
                setSubjectId('');
                await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
            }
        } catch (error) {
            console.error("Error creating pupil:", error);
        }
    };

    const handleEditPupil = async () => {
        try {
            if(pupilName || pupilGrade || subjectId) {
                await updatePupil({
                    variables: {
                        updatePupilId: selectedPupilId,
                        name: pupilName || undefined,
                        grade: pupilGrade || undefined,
                        subjectId: parseInt(subjectId, 10)
                    },
                    context: {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                });

                setOpenEditDialog(false);
                setPupilName('');
                setPupilGrade('');
                setSubjectId('');
                await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
            }
        } catch (error) {
            console.error("Error updating pupil:", error);
        }
    };

    const handleOpenModal = (pupilId) => {
        setSelectedPupilId(pupilId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPupilId(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setPupilName('');
        setPupilGrade('');
        setSubjectId('');
    };

    const handleOpenEditDialog = (pupil) => {
        setSelectedPupilId(pupil.id);
        setPupilName(pupil.name);
        setPupilGrade(pupil.grade);
        setSubjectId(pupil.subject.id.toString());
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setPupilName('');
        setPupilGrade('');
        setSubjectId('');
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Button variant="contained" color="primary" onClick={handleOpenCreateDialog} sx={{ mb: 2 }}>
                Add New Pupil
            </Button>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="pupils table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pupilsData.pupils.pupils.map((pupil) => (
                            <TableRow key={pupil.id}>
                                <TableCell component="th" scope="row">{pupil.id}</TableCell>
                                <TableCell>{pupil.name}</TableCell>
                                <TableCell>{pupil.grade}</TableCell>
                                <TableCell>{pupil.subject.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenEditDialog(pupil)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenModal(pupil.id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pupilsData.pupils.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this pupil?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} fullWidth maxWidth="sm">
                <DialogTitle>Create New Pupil</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Pupil Name"
                        value={pupilName}
                        onChange={(e) => setPupilName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Grade"
                        value={pupilGrade}
                        onChange={(e) => setPupilGrade(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        select
                        label="Subject"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                    >
                        {!!subjectsData?.subjects?.subjects && subjectsData.subjects.subjects.map((subject) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name} (ID: {subject.id})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog} color="primary">Cancel</Button>
                    <Button onClick={handleCreatePupil} color="primary" variant="contained">Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Pupil</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Pupil Name"
                        value={pupilName}
                        onChange={(e) => setPupilName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Grade"
                        value={pupilGrade}
                        onChange={(e) => setPupilGrade(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        select
                        label="Subject"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                    >
                        {!!subjectsData?.subjects?.subjects && subjectsData.subjects.subjects.map((subject) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name} (ID: {subject.id})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
                    <Button onClick={handleEditPupil} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default PupilsPage;
