"use client";
import { deleteArtwork } from "@/lib/actions/artworks";
import { Button, Modal } from "@heroui/react";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteModal = ({ artwork }) => {
  const router = useRouter();

  const id = artwork?._id;
  const artistId = artwork?.artistId;

  const handleDelete = async (id) => {
    try {
      const res = await deleteArtwork(id, artistId);

      toast.success("Delete succes");
      if (res?.data?.success && res?.data?.deletedCount > 0) {
        router.push("/browse-arts");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Modal>
        <Button color="danger" variant="shadow">
          🗑️ Delete Artwork
        </Button>

        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Rocket className="size-5" />
                </Modal.Icon>

                <Modal.Heading>Delete Artwork?</Modal.Heading>
              </Modal.Header>

              <Modal.Body>This action cannot be undone.</Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" slot="close">
                  Cancel
                </Button>

                <Button variant="danger" onClick={() => handleDelete(id)}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DeleteModal;
