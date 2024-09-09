import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner, useToast } from "@chakra-ui/react";
import BaseCard from "../common/BaseCard";
import { gptFetchInfo } from "../../lib/chatgpt";
import parse from "html-react-parser";

export default function ConflictDescription({
  conflict: { name, description },
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [descriptionInfo, setDescriptionInfo] = useState(description);
  const [descriptionSource, setDescriptionSource] = useState(
    description ? "wikipedia" : undefined
  );

  const init = async (description) => {
    setLoading(false);
    if (!description) {
      setLoading(true);
      try {
        await gptFetchInfo(`Tell me about ${name} within 100 words`).then(
          (res) => {
            setDescriptionInfo(res);
            setDescriptionSource("openAi");
          }
        );
      } catch (e) {
        toast({
          description: "Error occured while fetching conflict info",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setDescriptionSource("wikipedia");
    }
  };

  useEffect(() => {
    init(description);
  }, [description]);

  return (
    <BaseCard
      note={descriptionSource ? `Source: ${descriptionSource}` : undefined}
    >
      {loading && (
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Spinner size="md" color="teal" />
        </Flex>
      )}
      {typeof descriptionInfo === "string" && (
        <Text fontSize="lg" m={5}>
          {parse(descriptionInfo)}
        </Text>
      )}
    </BaseCard>
  );
}
