import { Button, CloseButton, Drawer, Field, Flex, HStack, NativeSelect, Portal } from '@chakra-ui/react'
import { MdTune } from 'react-icons/md'
export default function DetailSearch() {
    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <Flex justify={"flex-end"}>
                    <Button disabled variant={"surface"} background={"blue.200"} color={"gray"}>
                        <MdTune />絞り込み
                    </Button>
                </Flex>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title><HStack><MdTune />絞り込み</HStack></Drawer.Title>
                        </Drawer.Header>

                        <Drawer.Body>
                            <Field.Root>
                                <Field.Label>所持状況</Field.Label>
                                <NativeSelect.Root>
                                    <NativeSelect.Field>
                                        <option value="0" >(選択してください)</option>
                                        <option value="1">未所持</option>
                                        <option value="2">1~5</option>
                                        <option value="3">6~</option>
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator />
                                </NativeSelect.Root>
                            </Field.Root>
                        </Drawer.Body>

                        <Drawer.Footer>
                            <Button variant="outline">Cancel</Button>
                            <Button variant="subtle" color={"white"} background={"cyan.600"}>検索</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner></Portal>
        </Drawer.Root>
    )
}
