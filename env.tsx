<Target Name="CopyEnvFile" BeforeTargets="Build">
<Copy SourceFiles=".env" DestinationFolder="$(SpaRoot)" />
</Target>