import React from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import postCrawlingRequest from "../../api/postCrawlingRequest";
import Loading from "react-loading";

const CrawlerDialog = ({ openCrawlerDialog, setOpenCrawlerDialog }) => {
    const urlRef = React.useRef("");
    const pagesRef = React.useRef(0);
    const [showLoading, setShowLoading] = React.useState(false);

    const handleClickCloseDialog = (event, reason) => {
        if (showLoading && reason && reason === "backdropClick") {
            return;
        }

        setOpenCrawlerDialog(false);
    };

    const handleSubmitCrawlingRequest = async () => {
        try {
            setShowLoading(true);
            await postCrawlingRequest(
                urlRef.current.value,
                pagesRef.current.value
            );
            setOpenCrawlerDialog(false);
        } catch (error) {
            console.log(error);
        } finally {
            setShowLoading(false);
        }
    };

    return (
        <Dialog open={openCrawlerDialog} onClose={handleClickCloseDialog}>
            <DialogTitle
                variant="h5"
                children={!showLoading ? "Crawler" : "Crawling"}
            />
            <DialogContent>
                {!showLoading && (
                    <>
                        <Typography
                            children={
                                "To crawl the websites, please enter the seed url and number of pages to crawl."
                            }
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="url"
                            type="url"
                            fullWidth
                            variant="standard"
                            inputRef={urlRef}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pages"
                            label="pages"
                            type="number"
                            fullWidth
                            variant="standard"
                            inputRef={pagesRef}
                        />
                    </>
                )}
                {showLoading && (
                    <Loading
                        style={{ margin: "auto" }}
                        type={"spin"}
                        color={"#000000"}
                    />
                )}
            </DialogContent>

            {!showLoading && (
                <DialogActions>
                    <Button
                        onClick={handleClickCloseDialog}
                        children={"Cancel"}
                    />
                    <Button
                        onClick={handleSubmitCrawlingRequest}
                        children={"Submit"}
                    />
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CrawlerDialog;
